import { useState, type FormEvent, useEffect } from 'react';
import { type Question } from '../types/types';
import style from './QuestionCard.module.css';

interface Props {
  question: Question;
  onAnswer: (val: string) => void;
  onPass: () => void;
  disabled: boolean;
}

export const QuestionCard = ({ question, onAnswer, disabled, onPass }: Props) => {
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    setInputVal('');
  }, [question]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onAnswer(inputVal);
  };
  
  return (
    <div className={style.cardContainer}>
      <div className={style.content}>
        <p className={style.definition}>
          {question.prompt}
        </p>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          placeholder="Respuesta..."
          autoFocus
          autoComplete="off"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={disabled}
        />
      </form>

      <button
        onClick={onPass}
        disabled={disabled}
        className={style.btn}
        >
          Pasapalabra
        </button>
    </div>
  );
};