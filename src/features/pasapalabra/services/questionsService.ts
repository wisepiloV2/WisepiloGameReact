import { type Question, type AnswerState } from '../types/types';
import dataJson from '../data/questions.json';

interface QuestionDatabase {
  [categoryName: string]: string[][]; 
}

const ROSCO_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const getGameData = (category: string): Question[] => {
  const allQuestions = dataJson as QuestionDatabase;

  const questionsByCategory = allQuestions[category] || [];

  return questionsByCategory.map((item, index) => {
    return {
      letter: ROSCO_LETTERS[index], 
      prompt: item[0],
      answer: item[1],
      state: 'pending' as AnswerState 
    };
  });
};

export const getCategoriesGame = (): string[] => {
  return Object.keys(dataJson);
}