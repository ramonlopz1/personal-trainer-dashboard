import styles from "./ClientsOverview.module.css";
import { Dispatch, useState } from "react";

interface ClientsOverview {}

export default function ClientsOverview(props: ClientsOverview): JSX.Element {
  const loadJSX = <span className={styles.loading}>Carregando...</span>;

  const onClickHandler = async () => {};

  return (
    <div className={styles.clientsOverview}>
    
    </div>
  );
}
