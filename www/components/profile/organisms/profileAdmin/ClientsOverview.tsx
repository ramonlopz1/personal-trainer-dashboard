import styles from "./ClientsOverview.module.css";
import { Dispatch, useState } from "react";

interface IClientsOverview {
  clientsList: any | []
}

export default function ClientsOverview({ clientsList }: IClientsOverview): JSX.Element {
 
  console.log(clientsList)

  const onClickHandler = async () => {};

  return (
    <div className={styles.clientsOverview}>
      <h4>Overview</h4>
      <div className={styles.containers}>
          <div className={styles.container}>
            <h5>Total</h5>
            <span>
              {
                clientsList?.length
              }
            </span>
          </div>
          <div className={styles.container}>
            <h5>Ativos</h5>
            <span>
              {
                clientsList?.length
              }
            </span>
          </div>
          <div className={styles.container}>
            <h5>Inativos</h5>
            <span>
              {
                1
              }
            </span>
          </div>
          <div className={styles.container}>
            <h5>Média mensal</h5>
            <span>
              {
             3
              }
            </span>
          </div>
          <div className={styles.container}>
            <h5>Média anual</h5>
            <span>
              {
                0
              }
            </span>
          </div>
      </div>
    </div>
  );
}
