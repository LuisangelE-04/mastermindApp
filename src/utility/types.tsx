export interface GuessHistoryItem {
  guess: string[];
  exactMatches: number;
  positionMatches: number;
  noMatches: number;
  attemptNumber: number;
}

export interface GameStateResponse {
  gameId: number;
  status: string;
  attempts: number;
  guessHistory: GuessHistoryItem[];
  secretCode?: string[] | null;
}