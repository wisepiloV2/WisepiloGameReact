import React, { useState } from 'react';
import { type GameOptions } from '../types';
import style from './GameMenu.module.css'

interface GameMenuProps {
  onStart: (options: GameOptions) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStart }) => {
  const [players, setPlayers] = useState<1 | 2 | null>(null);
  const [startBot, setStartBot] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleStart = () => {
    if (!players) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    onStart({ numberOfPlayers: players, startBot });
  };

  return (
    <div className={style.container}>
      <div className={style.btns}>
        <button 
          className={`${style.btn} ${players === 1 ? style.selected : ''}`}
          onClick={() => setPlayers(1)}
        >
          1 Jugador
        </button>
        <button 
          className={`${style.btn} ${players === 2 ? style.selected : ''}`}
          onClick={() => setPlayers(2)}
        >
          2 Jugadores
        </button>
      </div>

      {players === 1 && (
        <div className={style.containerSwitch}>
          <p className={style.text}>Bot Inicia</p>
          <label className={style.switchToggle}>
            <input 
              type="checkbox" 
              className={style.switch} 
              checked={startBot}
              onChange={(e) => setStartBot(e.target.checked)}
            />
            <span className={style.slider}></span>
          </label>
        </div>
      )}

      {showError && (
        <div className={style.alert}>
          <p className={style.text}>❗¡Selecciona cantidad de jugadores!</p> 
        </div>
      )}

      <button className={style.btn} onClick={handleStart}>
        Iniciar
      </button>
    </div>
  );
};

export default GameMenu;