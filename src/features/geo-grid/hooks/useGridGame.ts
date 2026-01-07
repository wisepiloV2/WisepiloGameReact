import { useState, useEffect } from 'react';
import { getGameData, type Country } from '../services/countryService';
import { normalizeAnswer } from '../utils/textUtils';

type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export const useGridGame = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [gameState, setGameState] = useState<GameStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [solvedIndex, setSolvedIndex] = useState<Set<number>>(new Set());

  useEffect(() => {
    let timerId: number;

    if (gameState === 'playing' && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('lost');
    }

    return () => clearInterval(timerId);
  }, [gameState, timeLeft]);

  const startGame = (difficultyWeights: number[]) => {
      setGameState('idle');
      setSolvedIndex(new Set());
      setTimeLeft(60);

      const newCountries = getGameData(difficultyWeights);
      setCountries(newCountries);

      setGameState('playing');
    };

  const surrender = () => {
    setGameState('lost');
  };

  const checkAnswer = (input: string): boolean => {
      if (gameState !== 'playing') return false;
  
      const normalizedInput = normalizeAnswer(input);
      let foundMatch = false;
  
      countries.forEach((country, index) => {
        if (solvedIndex.has(index)) return;
  
        const normalizedCountryName = normalizeAnswer(country.country);
  
        if (normalizedInput === normalizedCountryName) {
          setSolvedIndex((prev) => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
          });
          foundMatch = true;
        }
      });
  
      if (foundMatch) {
         const currentSolvedCount = solvedIndex.size + 1;
         if (currentSolvedCount === countries.length) {
             setGameState('won');
         }
      }
  
      return foundMatch;
    };

  return {
    countries,      // La lista de datos para dibujar la grilla
    solvedIndex,    // Para saber qué cajas pintar de verde
    gameState,      // Para saber estado del juego
    timeLeft,       // Para mostrar el reloj
    startGame,      // Función para el botón "Jugar"
    checkAnswer,    // Función para el Input
    surrender       // Función para el botón "Rendirse"
  };
}