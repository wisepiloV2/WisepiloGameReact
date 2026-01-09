import { useState, useEffect } from 'react';
import { type Question, type AnswerState } from '../types/types';
import { textNormalize } from '../utils/gameHelpers';
import { INITIAL_DATA } from '../data/mockData';

export const useRoscoGame = (initialTime: number = 360) => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_DATA);
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
    } else if (timeLeft === 0) {
      finishGame();
    }
    return () => clearInterval(interval);
  }, [isGameActive, timeLeft, isGameFinished]);

  const getNextIndex = (startIndex: number, list: Question[]) => {
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
    if (isGameFinished) return;

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
    if (isGameFinished) return;
    const next = getNextIndex(currentIndex, questions);
    if (next !== -1) setCurrentIndex(next);
  };

  const startGame = () => {
    setQuestions(INITIAL_DATA);
    setCurrentIndex(0);
    setTimeLeft(initialTime);
    setIsGameActive(true);
    setIsGameFinished(false);
  };

  const finishGame = () => {
    setIsGameActive(false);
    setIsGameFinished(true);
  };

  return {
    questions,
    currentQuestion: questions[currentIndex],
    currentIndex,
    timeLeft,
    isGameActive,
    isGameFinished,
    startGame,
    processAnswer,
    passTurn
  };
};