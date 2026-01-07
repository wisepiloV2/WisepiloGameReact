import React from 'react';
import style from './GameFooter.module.css';

interface GameFooterProps {
  onOpenHelp: () => void;
  onSurrender: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
}

export const GameFooter = ({ 
  onOpenHelp, 
  onSurrender, 
  onKeyDown, 
  onChange, 
  value, 
  disabled 
}: GameFooterProps) => {
  
  return (
    <div className={style.container}>
      <div className={style.btnContainer}>
        <button className={style.btn} onClick={onSurrender}>Rendirse</button>
        <button className={style.btn} onClick={onOpenHelp}>¿Cómo jugar?</button>
      </div>
      <div className={style.answerContainer}> 
        <input 
          type="text" 
          placeholder="Nombre del país" 
          className={style.answer}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
};