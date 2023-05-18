import { Dispatch, SetStateAction } from "react";
import { IoArrowBack } from "react-icons/io5";
import styles from "./Form.module.css";

interface FormProps {
  email: string;
  password: string;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setEmail: (email: string) => void;
  setPassword: (email: string) => void;
  onSubmit: (e: any) => Promise<void>;
}

export default function Form({
  email,
  password,
  setShowForm,
  setEmail,
  setPassword,
  onSubmit,
}: FormProps): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <button className={styles.btnBack} onClick={() => setShowForm(false)}>
        <IoArrowBack />
      </button>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label htmlFor="user">E-mail</label>
          <input
            type="text"
            name="user"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="user"
            placeholder="Insira o seu usuário"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="pass">Senha</label>
          <input
            type="password"
            name="pass"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="user"
            placeholder="Insira a sua senha."
          />
        </div>
      </div>
      <input type="submit" className={styles.submit} value="Login" />
    </form>
  );
}
