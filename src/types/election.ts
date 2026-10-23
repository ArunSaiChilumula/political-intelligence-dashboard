export interface CandidateResult {
  candidate: string;
  party: string;
  votes: number;
  voteShare: number;
  winner: boolean;
}

export interface ParliamentaryElection {
  year: number;
  registeredElectors: number;
  totalVotesPolled: number;
  winner: string;
  winnerParty: string;
  winningMargin: number;
  turnout: number;
  candidates: CandidateResult[];
}

export interface AssemblyElection {
  assemblyNumber: number;
  assemblyName: string;
  year: number;
  registeredElectors: number;
  totalValidVotes: number;
  turnout: number;
  winner: {
    candidate: string;
    party: string;
    votes: number;
    voteShare: number;
  };
  runnerUp: {
    candidate: string;
    party: string;
    votes: number;
    voteShare: number;
  };
  winningMargin: number;
  candidates: CandidateResult[];
}

export interface AssemblyConstituency {
  number: number;
  name: string;
}
export interface Constituency {
  name: string;
  number: number;
  state: string;
  referenceYear: number;
  totalElectors?: number;
  geographicalCoverage?: string;
  assemblyConstituencies: AssemblyConstituency[];
}