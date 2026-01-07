import Card from '../../../components/ui/Card'; 
import styles from './GameCard.module.css';

interface GameCardProps {
  id: string;     
  title: string; 
  imageSrc: string; 
  onPlay: () => void;
}

function GameCard ({ id, title, imageSrc, onPlay }: GameCardProps) {
  return ( 
    <Card className={styles.gameContainer} onClick={onPlay}> 
      
      <div className={styles.imageWrapper}>
        <img 
            className={styles.gameImg} 
            src={imageSrc} 
            alt={title} 
        />
        <div className={styles.overlay}>
            <span className={styles.playText}>Jugar</span>
        </div>
      </div>

      <div className={styles.content} data-page={id}> 
        <h3 className={styles.gameTitle}>{title}</h3>
      </div>

    </Card>
  );
}

export default GameCard;