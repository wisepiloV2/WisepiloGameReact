import { useState, useEffect, useCallback } from 'react';
import { type BoardState, type GameOptions, type GameStatus, type Player } from '../types';
import { checkWinner, isBoardFull } from '../utils/gameHelpers';
import { getBotMove } from '../utils/botLogic';

const INITIAL_BOARD: BoardState = Array(9).fill(null);

export const useTicTacToe = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [turn, setTurn] = useState<Player>(1);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [winningLine, setWinningLine] = useState<number[]>([]);
  
  const [options, setOptions] = useState<GameOptions>({ 
    numberOfPlayers: null, 
    startBot: false 
  });

  const startGame = (selectedOptions: GameOptions) => {
    setOptions(selectedOptions);
    resetGame(selectedOptions);
  };

  const resetGame = (currentOptions: GameOptions = options) => {
    setBoard(Array(9).fill(null));
    setWinningLine([]);
    setStatus('playing');
    
    if (currentOptions.numberOfPlayers === 1 && currentOptions.startBot) {
      setTurn(2); 
    } else {
      setTurn(1);
    }
  };

  const handleMove = useCallback((index: number) => {
    if (board[index] !== null || status !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const winData = checkWinner(newBoard);
    
    if (winData) {
      setStatus('won');
      setWinningLine(winData.line);
    } else if (isBoardFull(newBoard)) {
      setStatus('draw');
    } else {
      setTurn((prev) => (prev === 1 ? 2 : 1));
    }
  }, [board, status, turn]);

  useEffect(() => {
    if (options.numberOfPlayers === 1 && turn === 2 && status === 'playing') {
      const timer = setTimeout(() => {
        const botIndex = getBotMove(board);
        if (botIndex !== null) handleMove(botIndex);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [turn, status, board, options, handleMove]);

  return {
    board,
    turn,
    status,
    winningLine,
    startGame,
    handleMove,
  };
};