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
      <h2 className={styles.title}>{user?.name}</h2>
      <form className={styles.form}>
        <div className={styles.div_input}>
          <label htmlFor="id">ID</label>
          <input name="id" type="text" value={user?.id || ""} />
        </div>

        <div className={styles.div_input}>
          <label htmlFor="birthDate">Data nasc.</label>
          <input name="birthDate" type="text" value={user?.birthDate || ""} />
        </div>
        <div className={styles.div_input}>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" value={user?.name || ""} readOnly />
        </div>
        <div className={styles.div_input}>
          <label htmlFor="email">E-mail</label>
          <input name="email" type="text" value={user?.email || ""} />
        </div>
        <div className={styles.div_input}>
          <label htmlFor="gender">Gênero</label>
          <input name="gender" type="text" value={user?.gender || ""} />
        </div>

        <div className={styles.div_input}>
          <label htmlFor="phone">Telefone</label>
          <input name="phone" type="text" value={user?.phone || ""} />
        </div>

        <div className={styles.div_input}>
          <label htmlFor="createdAt">Data criação</label>
          <input name="createdAt" type="date" value={user?.createdAt} />
        </div>

        <div className={styles.formHealthInformation}>
          <div className={styles.div_input}>
            <label htmlFor="objective">Objetivo</label>
            <input
              name="objective"
              type="text"
              value={user?.healthInformation?.objective}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
