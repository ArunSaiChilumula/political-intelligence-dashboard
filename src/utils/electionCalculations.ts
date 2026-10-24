export function calculateVoteShare(candidateVotes: number, totalValidVotes: number): number {
  return totalValidVotes > 0 ? (candidateVotes / totalValidVotes) * 100 : 0;
}

export function calculateWinningMargin(winnerVotes: number, runnerUpVotes: number): number {
  return winnerVotes - runnerUpVotes;
}

export function calculateWinningMarginPercentage(
  winningMargin: number,
  totalValidVotes: number,
): number {
  return totalValidVotes > 0 ? (winningMargin / totalValidVotes) * 100 : 0;
}

export function calculateTurnout(votesPolled: number, registeredElectors: number): number {
  return registeredElectors > 0 ? (votesPolled / registeredElectors) * 100 : 0;
}