export type AnswerState = 'pending' | 'correct' | 'wrong';

export interface Question {
  letter: string;
  prompt: string;
  answer: string;
  state: AnswerState;
}

export interface GameConfig {
  initialTime: number;
  category: string;
}