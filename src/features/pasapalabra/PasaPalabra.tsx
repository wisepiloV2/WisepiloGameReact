import { useRoscoGame } from './hooks/useGameHook';
import { RoscoWheel } from './components/RoscoWheel';
import { QuestionCard } from './components/QuestionCard';
import { MenuOptions } from './components/MenuOptions';
import { useState } from 'react';
import style from './PasaPalabra.module.css';

export const GameContainer = () => {
  const {
    questions,
    currentQuestion,
    currentIndex,
    timeLeft,
    isGameActive,
    isGameFinished,
    startGame,
    processAnswer,
    passTurn,
    getCategories
  } = useRoscoGame();

  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  return (
    <div className={style.container}>
      <div className={style.options}>
        <MenuOptions 
          categories={categories} 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
          onClick={() => startGame(selectedCategory)} 
        />
        <span className={`${style.timer} ${timeLeft <= 10 ? style.critical : ''}`}>
          {timeLeft}s
        </span>
      </div>

      <RoscoWheel questions={questions} currentIdx={currentIndex}>
        
        {!isGameActive && !isGameFinished && (
          <button onClick={() => startGame(selectedCategory)} className={style.btn}>
            Comenzar Juego
          </button>
        )}

        {isGameActive && !isGameFinished && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={processAnswer}
            onPass={passTurn}
            disabled={false}
          />
        )}

        {isGameFinished && (
          <div className={style.gameOverContainer}>
            <h3>¡Juego Terminado!</h3>
            <button onClick={() => startGame(selectedCategory)} className={style.btn}>
              Jugar de nuevo
            </button>
          </div>
        )}
        
      </RoscoWheel>      
    </div>
  );
};