import { GameState } from "../types/gameTypes";

export interface GameHeaderProps {
  gameState: GameState;
  playerName?: string;
  score?: number;
}
export interface LeaderboardItem {
  userId: string;
  username: string;
  score: number;
}

export interface StyledGameHeaderBoxProps {
  gameState: GameHeaderProps["gameState"];
}