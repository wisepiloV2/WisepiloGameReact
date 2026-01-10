import { useState, useRef, useEffect } from 'react';
import style from './RoscoWheel.module.css'; 
import { type Question } from '../types/types';
import { type ReactNode } from 'react';

interface Props {
  questions: Question[];
  currentIdx: number;
  children: ReactNode;
}

export const RoscoWheel = ({ questions, currentIdx, children }: Props) => {
  const total = questions.length;
  
  const [answerText, setAnswerText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleShowAnswer = (q: Question) => {
    if (q.state === 'pending') return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAnswerText(q.answer);
    setIsVisible(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className={style.container}>
      {questions.map((q, idx) => {
        let bgClass = ''; 
        if (q.state === 'correct') bgClass = style.correct;
        if (q.state === 'wrong') bgClass = style.wrong;
        if (idx === currentIdx && q.state === 'pending') bgClass = style.pending;

        return (
          <button
            key={q.letter}
            onClick={() => handleShowAnswer(q)}
            className={`${style.letter} ${bgClass}`}
            style={{ 
              '--i': idx, 
              '--total': total,
              cursor: q.state !== 'pending' ? 'pointer' : 'default' 
            } as React.CSSProperties} 
          >
            {q.letter}
          </button>
        );
      })}
      <span className={`${style.answer} ${isVisible ? style.show : ''}`}>
        {answerText.charAt(0).toUpperCase() + answerText.slice(1)}
      </span>

      <div className={style.questionsCard}>
        {children}
      </div>
    </section>
  );
};