import { GameFooter } from "./components/GameFooter"
import { GameHeader } from "./components/GameHeader"
import { GridCard } from "./components/GridCard"
import { HowToPlay } from "./components/HowToPlay"
import { useState, type KeyboardEvent } from 'react';
import { useGridGame } from './hooks/useGridGame';
import style from "./GeoGrid.module.css"

type DifficultyLevel = 'facil' | 'normal' | 'dificil';

const DIFFICULTY_SETTINGS: Record<DifficultyLevel, number[]> = {
  facil: [10],
  normal: [8, 7],
  dificil: [5]
};

export const GeoGrid = () => {
  const [showHowtoPlay, setHowtoPlay] = useState<boolean>(true);
  const [difficulty, setDificulty] = useState<DifficultyLevel>('facil');
  const difficulties : string[] = ['Facil', 'Normal', 'Dificil'];

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDificulty(e.target.value as DifficultyLevel);
  }

  const [inputValue, setInputValue] = useState('');

  const handleStartGame = () => {
    const weights = DIFFICULTY_SETTINGS[difficulty];
    startGame(weights);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer(inputValue);
      setInputValue('');
    }
  };

  const {
    countries, 
    solvedIndex, 
    gameState, 
    timeLeft, 
    startGame, 
    checkAnswer, 
    surrender 
  } = useGridGame();

  const isGameOver = gameState === 'lost' || gameState === 'won';

  return (
    <div className={style.container}>
      <GameHeader 
        difficulties={difficulties}
        onStart={handleStartGame}  
        onChange={handleDifficultyChange}
        disabled={gameState === 'playing'}
      />
      
      <div className={style.gridContainer}>
        <div className={style.info}><span className={style.infoText}>Geo Grid</span></div>
        <div className={style.timer}><span className={style.timerText}>{timeLeft}</span></div>
        
        {countries.map((country, index) => {
          const isSolved = Array.isArray(solvedIndex) 
            ? solvedIndex.includes(index) 
            : (solvedIndex as Set<number>).has(index);
            
          const showName = isSolved || isGameOver;

          let status: 'default' | 'correct' | 'wrong' = 'default';
          if (isSolved) status = 'correct';
          else if (isGameOver && !isSolved) status = 'wrong';

          return (
            <GridCard 
              key={`${country.code}-${index}`}
              imageSrc={`https://flagcdn.com/64x48/${country.code.toLowerCase()}.png`}
              countryName={showName ? country.country : null}
              status={status}
            />
          );
        })}
      </div>

      <GameFooter 
        onOpenHelp={() => setHowtoPlay(true)} 
        onSurrender={surrender}
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={gameState !== 'playing'}
      />

      <HowToPlay 
        isVisible={showHowtoPlay} 
        onClose={() => setHowtoPlay(false)} 
      />
    </div>
  );
}