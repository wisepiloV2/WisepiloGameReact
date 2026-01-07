export type Player = 1 | 2; // 1 = Cruz, 2 = Círculo
export type BoardState = (Player | null)[]; 
export type GameStatus = 'idle' | 'playing' | 'won' | 'draw';

export interface WinData {
  winner: Player;
  line: number[];
}

export interface GameOptions {
  numberOfPlayers: 1 | 2 | null;
  startBot: boolean;
}