import React from 'react';
import { type Player } from '../types';
import style from './Square.module.css'

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning: boolean;
  animationClass: string;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning, animationClass }) => {
  const imgSrc = value === 1 ? '/assets/cruz.png' : '/assets/circulo.png';
  
  return (
    <div className={style.container} onClick={onClick}>
      {value && (
        <img 
          src={imgSrc} 
          alt={value === 1 ? "X" : "O"} 
          className={`${style.container} ${isWinning ? animationClass : ''}`}
        />
      )}
    </div>
  );
};

export default Square;