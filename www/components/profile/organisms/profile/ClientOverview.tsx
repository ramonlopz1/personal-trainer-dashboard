import { Users } from "@prisma/client";
import styles from "./ClientOverview.module.css";
import { Dispatch, useState } from "react";

interface ClientOverview {
  user: any;
}

export default function ClientsOverview({ user }: ClientOverview): JSX.Element {
  const loadJSX = <span className={styles.loading}>Carregando...</span>;

  const onClickHandler = async () => {};

  return (
    <div className={styles.clientsOverview}>
      <h3 className={styles.title}>{user?.name}</h3>
      <form className={styles.form}>
        <div className={styles.personalInfo}>
          <h5>Informações pessoais</h5>
          <div className={styles.personalInfoInputs}>
            <div className={styles.divInput}>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                value={user?.name || ""}
                readOnly
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="gender">Gênero</label>
              <input name="gender" type="text" value={user?.gender || ""} />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="birthDate">Data nasc.</label>
              <input
                name="birthDate"
                type="text"
                value={user?.birthDate || ""}
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="email">E-mail</label>
              <input name="email" type="text" value={user?.email || ""} />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="phone">Telefone</label>
              <input name="phone" type="text" value={user?.phone || ""} />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="createdAt">Data criação</label>
              <input name="createdAt" type="date" value={user?.createdAt} />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="objective">Objetivo</label>
              <input
                name="objective"
                type="text"
                value={user?.healthInformation?.objective}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="weight">Peso</label>
              <input
                name="weight"
                type="text"
                value={`${user?.healthInformation?.weight} kg`}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="height">Altura</label>
              <input
                name="height"
                type="text"
                value={`${user?.healthInformation?.height} m`}
              />
            </div>
          </div>
        </div>
        <div className={styles.healthInfo}>
          <h5>Informações técnicas</h5>
          <div className={styles.healthInfoBox}>
            <div className={styles.healthInfoInputs}>
              <div className={styles.divInput}>
                <label htmlFor="classificationEN">Classificação do EN</label>
                <input
                  name="classificationEN"
                  type="text"
                  value={`${user?.healthInformation?.classificationEN} m`}
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="imc">IMC</label>
                <input
                  name="imc"
                  type="text"
                  value={user?.healthInformation?.imc}
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="fc">FC</label>
                <input
                  name="fc"
                  type="text"
                  value={user?.healthInformation?.fc}
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="vo2max">Vo2Max</label>
                <input
                  name="vo2max"
                  type="text"
                  value={user?.healthInformation?.vo2max}
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="pa">PA</label>
                <input
                  name="pa"
                  type="text"
                  value={`${user?.healthInformation?.pa}`}
                />
              </div>
            </div>
            <div className={styles.healthDescription}>
              <label htmlFor="description">Informações</label>
              <textarea name="description"></textarea>
              <div>
                <h5>Informações</h5>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
