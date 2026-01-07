import { type BoardState } from '../types';
import { WINNING_COMBINATIONS } from './gameHelpers';

const HUMAN = 1;
const BOT = 2;

export const getBotMove = (board: BoardState): number | null => {
  const strategicMove = tryWinOrBlock(board);
  if (strategicMove !== null) return strategicMove;

  if (board[4] === null) return 4;

  const freeBoxes = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);
  
  if (freeBoxes.length > 0) {
    const randomIdx = Math.floor(Math.random() * freeBoxes.length);
    return freeBoxes[randomIdx];
  }
  
  return null;
};

const tryWinOrBlock = (board: BoardState): number | null => {
  return findWinningMove(board, BOT) ?? findWinningMove(board, HUMAN);
};

const findWinningMove = (board: BoardState, playerVal: number): number | null => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const lineValues = [board[a], board[b], board[c]];
    const indices = [a, b, c];

    const countPlayer = lineValues.filter(val => val === playerVal).length;
    const countEmpty = lineValues.filter(val => val === null).length;

    if (countPlayer === 2 && countEmpty === 1) {
      return indices[lineValues.indexOf(null)];
    }
  }
  return null;
};