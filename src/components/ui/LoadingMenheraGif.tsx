import style from './LoadingMenheraGif.module.css';

interface LoadingProps {
  message: string;
}

export const LoadingMenheraGif = ({ message }: LoadingProps) => {
  return (
    <div className={style.container}>
      <img src="/assets/Menhera.gif" alt="Loading Gif" className={style.img} />
      <p className={style.text}>{message}</p>
    </div>
  );
};