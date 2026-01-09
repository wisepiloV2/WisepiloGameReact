import { useTicTacToe } from './hooks/useTicTacToe';
import GameMenu from './components/GameMenu';
import Board from './components/Board';
import style from './TicTacToe.module.css'

export const TicTacToe = () => {
  const { 
    board, 
    turn, 
    status, 
    winningLine, 
    startGame, 
    handleMove,
  } = useTicTacToe();

  return (
  <div className={style.container}>
    <GameMenu onStart={startGame} />
        {status === 'idle' ? '' : (
          <>
          <div className={style.gridContainer}>
            <div className={style.info}><span className={style.infoText}>Turno de</span></div>
            <div className={style.turn}>
              <img 
                src={turn === 1 ? '/assets/cruz.png' : '/assets/circulo.png'} 
                alt="Turno actual"
                className={style.img}
              />
            </div> 
            <Board 
              board={board} 
              onSquareClick={handleMove}
              winningLine={winningLine}
            />
          </div>
          </>
          )}
  </div>
  );

};