import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export type DropdownOption<T extends string | number> = {
  value: T;
  label: string;
};

type CustomDropdownProps<T extends string | number> = {
  id: string;
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
};

function CustomDropdown<T extends string | number>({
  id,
  label,
  value,
  options,
  onChange,
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value)),
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options[selectedIndex];
  const listboxId = `${id}-options`;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) activeOptionRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen]);

  const openList = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const chooseOption = (index: number) => {
    const option = options[index];
    if (!option) return;

    onChange(option.value);
    setActiveIndex(index);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      if (isOpen) {
        event.preventDefault();
        setIsOpen(false);
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openList();
        return;
      }

      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + direction + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOpen) {
        openList();
      } else {
        chooseOption(activeIndex);
      }
    }

    if (event.key === "Tab" && isOpen) setIsOpen(false);
  };

  return (
    <div className="assembly-dropdown" ref={dropdownRef}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className="assembly-dropdown-trigger"
        role="combobox"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-activedescendant={isOpen ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : openList())}
        onKeyDown={handleKeyDown}
      >
        <span className="assembly-dropdown-value">
          {selectedOption?.label ?? `Select ${label.toLowerCase()}`}
        </span>
        <svg
          className={`assembly-dropdown-chevron${isOpen ? " is-open" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        id={listboxId}
        className="assembly-dropdown-listbox"
        role="listbox"
        aria-label={label}
        hidden={!isOpen}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            ref={index === activeIndex ? activeOptionRef : null}
            id={`${id}-option-${index}`}
            className={`assembly-dropdown-option${option.value === value ? " is-selected" : ""}${index === activeIndex ? " is-active" : ""}`}
            role="option"
            aria-selected={option.value === value}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => chooseOption(index)}
          >
            <span>{option.label}</span>
            {option.value === value && (
              <span className="assembly-dropdown-check" aria-hidden="true">✓</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomDropdown;