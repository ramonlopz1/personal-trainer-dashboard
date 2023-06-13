import styles from "./CodeGenerator.module.css";
import { useState } from "react";

export default function CodeGenerator(): JSX.Element {
  const [generatedCode, setGeneratedCode] = useState<any>();

  const loadJSX = <span className={styles.loading}>Carregando...</span>;
  
  const onClickHandler = async () => {
    setGeneratedCode(loadJSX);
    const fetched = await fetch("/api/restricted/raffleCodeGenerator");
    const data = await fetched.json();
    setGeneratedCode(data.code);
  };

  return (
    <div className={styles.codeGenerator}>
      <h4>Gerar novo código</h4>
      <span className={styles.generatedCode}>{generatedCode}</span>
      <button onClick={onClickHandler} className={styles.btnGenerator}>
        Novo
      </button>
    </div>
  );
}
