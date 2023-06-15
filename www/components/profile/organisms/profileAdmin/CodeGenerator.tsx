import styles from "./CodeGenerator.module.css";
import { Dispatch, useState } from "react";

interface CodeGeneratorProps {
  generatedCode: string;
  setGeneratedCode: Dispatch<string | JSX.Element>
}

export default function CodeGenerator(props: CodeGeneratorProps): JSX.Element {
  const { generatedCode, setGeneratedCode } = props;

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
      <span className={styles.generatedCode}>{generatedCode ? generatedCode : "- - - - - - - -"}</span>
      <button onClick={onClickHandler} className={styles.btnGenerator}>
        Novo
      </button>
    </div>
  );
}
