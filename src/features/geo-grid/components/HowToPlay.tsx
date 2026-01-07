import style from "./HowToPlay.module.css"

interface PanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export const HowToPlay = ({ isVisible, onClose }: PanelProps) => {
  
  if (!isVisible) return null;

  return (
    <div className={style.container}>
      <i 
        className={`fa-solid fa-xmark ${style.close}`}
        onClick={onClose} 
      ></i>

      <p className={style.text}>
        Escribe el nombre del país que representa la bandera. <br></br>🚫No se acepta abreviaciones.<br /><br />
 
        <strong>Si aciertas:</strong><br />
        ✅ La celda se ilumina en verde.<br />
        👆 Puedes hacer clic en la imagen para ver el nombre del país nuevamente.<br /><br />

        <strong>Si se acaba el tiempo o te rindes:</strong><br />
        ❌ La celda se ilumina en rojo.<br />
        👆 Al hacer clic en la imagen, aparecerá el nombre correcto del país.
      </p>
    </div>
  );
};
