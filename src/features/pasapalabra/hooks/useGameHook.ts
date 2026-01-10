import { useState, useEffect } from 'react';
import { type Question, type AnswerState } from '../types/types';
import { textNormalize } from '../utils/gameHelpers';
import { getGameData, getCategoriesGame } from '../services/questionsService'

export const useRoscoGame = (initialTime: number = 10) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  useEffect(() => {
    let interval: number;
    if (isGameActive && timeLeft > 0 && !isGameFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameActive) { 
      finishGame();
    }
    return () => clearInterval(interval);
  }, [isGameActive, timeLeft, isGameFinished]);

  const getNextIndex = (startIndex: number, list: Question[]) => {
    if (!list || list.length === 0) return -1; 

    let nextIndex = (startIndex + 1) % list.length;
    let loopCount = 0;
    
    while (list[nextIndex].state !== 'pending' && loopCount < list.length) {
      nextIndex = (nextIndex + 1) % list.length;
      loopCount++;
    }
    
    if (loopCount === list.length && list[startIndex].state !== 'pending') {
      return -1;
    }
    return nextIndex;
  };

  const checkGameStatus = (currentList: Question[]) => {
    const pending = currentList.filter(q => q.state === 'pending');
    if (pending.length === 0) {
      finishGame();
      return true;
    }
    return false;
  };

  const processAnswer = (userAnswer: string) => {
    if (isGameFinished || questions.length === 0) return;

    const currentQ = questions[currentIndex];
    const isCorrect = textNormalize(userAnswer) === textNormalize(currentQ.answer);
    const newState: AnswerState = isCorrect ? 'correct' : 'wrong';

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = { ...currentQ, state: newState };
    
    setQuestions(updatedQuestions);

    if (!checkGameStatus(updatedQuestions)) {
      const next = getNextIndex(currentIndex, updatedQuestions);
      if (next !== -1) setCurrentIndex(next);
    }
  };

  const passTurn = () => {
    if (isGameFinished || questions.length === 0) return;
    const next = getNextIndex(currentIndex, questions);
    if (next !== -1) setCurrentIndex(next);
  };

  const getCategories = () => {
    return getCategoriesGame();
  }

  const startGame = (category: string = 'mix') => {
    const gameData = getGameData(category);
    setQuestions(gameData);
    setCurrentIndex(0);
    setTimeLeft(initialTime); 
    setIsGameActive(true);
    setIsGameFinished(false);
  };

  const finishGame = () => {
    setIsGameActive(false);
    setIsGameFinished(true);
  };

  const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

  return {
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
  };
};