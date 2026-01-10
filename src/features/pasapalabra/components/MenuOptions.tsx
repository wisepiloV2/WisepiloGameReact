import style from './MenuOptions.module.css';
import { useState } from 'react';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  onClick: () => void;
}

export const MenuOptions = ({ categories, selected, onSelect, onClick } : Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.btns}>
        <button className={style.btn} onClick={onClick}>Reiniciar</button>
        <button className={style.btn} onClick={() => setShowOptions(!showOptions)}>Configuración</button>
      </div>
      {showOptions ? 
        <div className={style.options}>
          <label>Selecciona una categoría</label>
          <select value={selected} onChange={handleChange}>
            {categories.map((category) => {
              return(
                <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
              );
            })}
          </select>
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