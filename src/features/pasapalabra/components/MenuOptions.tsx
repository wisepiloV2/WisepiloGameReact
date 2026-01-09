import style from './MenuOptions.module.css';
import { useState } from 'react';

export const MenuOptions = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.btns}>
        <button className={style.btn}>Reiniciar</button>
        <button className={style.btn} onClick={() => setShowOptions(!showOptions)}>Configuración</button>
      </div>
      {showOptions ? 
        <div className={style.options}>
          <label>Selecciona una categoría</label>
          <select></select>
          <div className={style.containerSwitch}>
            <p className={style.text}>Temporizador</p>
            <label className={style.switchToggle}>
              <input 
                type="checkbox" 
                className={style.switch} 
              />
              <span className={style.slider}></span>
            </label>
          </div>
        </div>
      : ''}
    </div>
  );
}