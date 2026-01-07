import { type ChangeEvent } from 'react';
import style from './GameHeader.module.css';

interface HeaderProps {
  difficulties: string[];
  onStart: () => void; 
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
}

export const GameHeader = ({ 
  difficulties, 
  onStart, 
  onChange,
  disabled,
}: HeaderProps) => {
  
  return (
    <div className={style.container}>
      <select className={style.select} onChange={onChange}>
        {difficulties.map((difficulty, index) => (
          <option key={index} value={difficulty.toLowerCase()}>
            {difficulty}
          </option>
        ))}
      </select>
      
      <button className={style.btn} onClick={onStart}>
        {disabled ? 'Reiniciar' : 'Jugar'}
      </button>
    </div>
  );
};