import { type BoardState, type WinData } from '../types';

export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const checkWinner = (board: BoardState): WinData | null => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const value = board[a];
    if (value && value === board[b] && value === board[c]) {
      return { winner: value, line: [a, b, c] };
    }
  }
  return null;
};

export const isBoardFull = (board: BoardState): boolean => {
  return board.every((cell) => cell !== null);
};