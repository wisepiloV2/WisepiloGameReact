import { useState } from 'react';
import style from './GridCard.module.css';

interface GridCardProps {
  imageSrc: string;
  countryName: string | null;
  status: 'default' | 'correct' | 'wrong';
}

export const GridCard = ({ imageSrc, countryName, status }: GridCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStatus = `${style.card} ${status === 'correct' ? style.correct : ''} ${status === 'wrong' ? style.wrong : ''}`;

  return (
    <div className={`${style.container} ${cardStatus}`} onClick={handleFlip}> 
      <div className={`${style.cardContainer} ${isFlipped ? style.flipped : ''}`}>
        
        <div className={style.front}>
          <img className={style.img} src={imageSrc} alt="Bandera" />
        </div>

        <div className={style.back}>
          <span className={style.answer}>{countryName ? countryName : "..."}</span>
        </div>

      </div>
    </div>
  );
};