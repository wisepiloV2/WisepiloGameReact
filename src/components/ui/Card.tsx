import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card ({ children, className = '', onClick }: CardProps) {
  const interactionStyle = onClick ? { cursor: 'pointer' } : {};

  return ( 
    <div 
        className={`${styles.container} ${className}`} 
        onClick={onClick}
        style={interactionStyle} 
    >
      {children}
    </div>
  );
};

export default Card;