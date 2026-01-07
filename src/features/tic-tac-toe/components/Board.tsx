import React from 'react';
import Square from './Square';
import { type BoardState } from '../types';
import style from './Board.module.css'

interface BoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  winningLine: number[];
}

const Board: React.FC<BoardProps> = ({ board, onSquareClick, winningLine }) => {
  return (
    <div>
      <div className={style.gridContainer}>
        {board.map((value, index) => {
          const isWinning = winningLine.includes(index);
          const animClass = style.win;

          return (
            <Square
              key={index}
              value={value}
              onClick={() => onSquareClick(index)}
              isWinning={isWinning}
              animationClass={animClass}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;