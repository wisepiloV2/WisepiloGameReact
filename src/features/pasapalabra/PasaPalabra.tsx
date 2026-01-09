import { useRoscoGame } from './hooks/useGameHook';
import { RoscoWheel } from './components/RoscoWheel';
import { QuestionCard } from './components/QuestionCard';
import { MenuOptions } from './components/MenuOptions';
import style from './PasaPalabra.module.css'

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
    passTurn
  } = useRoscoGame();

  return (
    <div className={style.container}>
      <div className={style.options}>
        <MenuOptions />
        <span className={`${style.timer} ${timeLeft <= 10 ? style.critical : ''}`}>
          {timeLeft}s
        </span>
      </div>

      <RoscoWheel questions={questions} currentIdx={currentIndex}>
        {!isGameActive && !isGameFinished && (
          <button onClick={startGame} className={style.btn}>
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
      </RoscoWheel>      
    </div>
  );
};