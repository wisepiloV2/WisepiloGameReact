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

  return (
    <section className={style.container}>
      {questions.map((q, idx) => {
        let bgClass = ''; 
        if (q.state === 'correct') bgClass = style.correct;
        if (q.state === 'wrong') bgClass = style.wrong;
        if (idx === currentIdx && q.state === 'pending') bgClass = style.pending;

        return (
          <div 
            key={q.letter} 
            className={`${style.letter} ${bgClass}`}
            style={{ 
              '--i': idx, 
              '--total': total 
            } as React.CSSProperties} 
          >
            {q.letter}
          </div>
        );
      })}
      <div className={style.questionsCard}>
        {children}
      </div>
    </section>
  );
};