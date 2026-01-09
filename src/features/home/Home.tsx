import { useNavigate } from 'react-router-dom';
import GameCard from './components/GameCard';
import style from './Home.module.css';


interface Game {
  id: string;
  title: string;
  img: string;
  route: string;
}


const GAMES: Game[] = [
  { id: 'geo-grid', title: 'Geo Grid', img: '/assets/GeoGrid.png', route: '/geo-grid' },
  { id: 'pasapalabra', title: 'Pasapalabra', img: '/assets/PasaPalabra.png', route: '/pasapalabra' },
  { id: 'tic-tac-toe', title: 'Tic Tac Toe', img: '/assets/TicTacToe.png', route: '/tic-tac-toe' },
];


export const Home = () => {
  const navigate = useNavigate();

  const handlePlay = (route: string) => {
    navigate(route);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Elige tu juego</h1> 

      <div className={style.grid}>
        {GAMES.map((game) => (
          <GameCard 
            key={game.id}
            id={game.id}
            title={game.title}
            imageSrc={game.img}
            onPlay={() => handlePlay(game.route)}
          />
        ))}
      </div>
    </div>
  );
};