# Political Intelligence Dashboard

A responsive Political Intelligence Dashboard built with React, TypeScript, Vite, Tailwind CSS, and Recharts.

The dashboard focuses on the **Hyderabad Lok Sabha Constituency (Constituency No. 9), Telangana** and provides constituency information, parliamentary election analysis, assembly constituency results, and electoral trends.

## Features

- Constituency overview
- Assembly constituency listing
- Parliamentary election analysis
- Election year filtering
- Assembly constituency explorer
- Assembly candidate results
- Winning margin comparison
- Candidate vote-share visualization
- Electoral trend charts
- Voter turnout trends
- Winning margin trends
- Responsive layout for desktop, tablet, and mobile
- Explicit unavailable-data states
- Calculation methodology section

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React

## Project Structure

src/
├── components/
│ └── ParliamentarySection.tsx
├── pages/
│ ├── Overview.tsx
│ ├── AssemblyExplorer.tsx
│ └── ElectoralTrends.tsx
├── data/
│ ├── constituency.json
│ ├── parliamentaryElections.json
│ └── assemblyElections.json
├── types/
├── services/
├── utils/
├── App.tsx
├── index.css
└── main.tsx

## Data Sources

Election data is based on official Election Commission of India (ECI) election results and statistical reports.

### Parliamentary Elections

Source:

Election Commission of India

https://results.eci.gov.in/

Election years represented in the dashboard:

- 2014
- 2019
- 2024

### Telangana Assembly Election 2023

Source:

Election Commission of India — Telangana Legislative Assembly Election 2023 statistical reports and detailed constituency results.

https://www.eci.gov.in/

Assembly constituencies represented:

- 58 — Malakpet
- 64 — Karwan
- 65 — Goshamahal
- 66 — Charminar
- 67 — Chandrayangutta
- 68 — Yakutpura
- 69 — Bahadurpura

## Calculation Methodology

### Vote Share

Vote Share (%) =
Candidate Votes ÷ Total Valid Votes × 100

### Winning Margin

Winning Margin =
Winner Votes − Runner-up Votes

### Winning Margin Percentage

Winning Margin (%) =
Winning Margin ÷ Total Valid Votes × 100

### Voter Turnout

Turnout (%) =
Votes Polled ÷ Registered Electors × 100

The dashboard uses the appropriate denominator for each calculation and displays percentages rounded to two decimal places.

## Data Handling

The dashboard does not fabricate unavailable information.

Where verified constituency-level demographic information is not available in the current dataset, the dashboard explicitly displays:

`Data unavailable`

This applies to demographic indicators such as:

- Population
- Gender distribution
- Rural / Urban distribution
- Literacy rate
- SC population
- ST population

## Reference Year

The constituency demographic reference year shown in the dashboard is **2024**.

Election results are associated with their respective election years and should not be interpreted as demographic reference years.

## Limitations

- The current dashboard focuses on one Lok Sabha constituency.
- Historical assembly analysis currently uses the available 2023 Telangana Assembly Election dataset.
- Some constituency-level demographic indicators are unavailable in the current verified dataset.
- The dashboard does not infer individual voter behaviour or voting preferences.
- Election percentages are calculated using the documented methodology and available valid-vote denominators.
- The dashboard is a frontend application and does not currently use a backend API.

## Running the Project

Install dependencies:

npm install

Start the development server:

npm run dev

The application will normally be available at:

http://localhost:5173/

## Production Build

Create a production build:

npm run build

Preview the production build:

npm run preview

## Assumptions

- Election result data is stored locally in JSON files for this frontend assignment.
- Data is separated from UI components to make future API integration easier.
- Charts are generated from the structured election data.
- Missing or unavailable data is displayed explicitly rather than estimated.

## Future Improvements

- Add verified demographic data from Census/Government sources.
- Add more historical Assembly Election years.
- Add API-based data loading.
- Add table sorting and pagination.
- Add richer party performance comparisons.
- Add automated tests for calculations and UI components.
- Add source links directly to individual data sections.
