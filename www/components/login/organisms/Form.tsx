import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  IoArrowBack,
  IoPersonSharp,
  IoMailUnreadSharp,
  IoKeyOutline,
  IoKey,
  IoCalendarNumberSharp,
  IoCallSharp,
} from "react-icons/io5";
import InputMask from "react-input-mask";
import styles from "./Form.module.css";

interface FormProps {
  userData: any;
  loginErrorMsg: string;
  registerErrorMsg: string;
  setShowFormLogin: Dispatch<SetStateAction<boolean>>;
  setShowFormRegister: Dispatch<SetStateAction<boolean>>;
  showFormRegister: boolean;
  appendUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  login: (e: any) => Promise<void>;
  register: (e: any) => Promise<void>;
}

export default function Form({
  userData,
  loginErrorMsg,
  registerErrorMsg,
  setShowFormLogin,
  setShowFormRegister,
  showFormRegister,
  appendUserData,
  login,
  register,
}: FormProps): JSX.Element {

  const emailRegex = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'

  return (
    <form onSubmit={login} className={styles.form}>
      <button
        className={styles.btnBack}
        onClick={() => setShowFormLogin(false)}
      >
        <IoArrowBack />
      </button>
      {showFormRegister ? (
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="name">
              <IoPersonSharp />
            </label>
            <input
              type="text"
              name="name"
              required
              value={userData.name}
              onChange={appendUserData}
              placeholder="Insira o seu nome"
            />
          </div>
        </div>
      ) : (
        false
      )}
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label htmlFor="email">
            <IoMailUnreadSharp />
          </label>
          <input
            type="email"
            name="email"
            required
            pattern={emailRegex}
            value={userData.email}
            onChange={appendUserData}
            placeholder="email@email.com"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">
            <IoKey />
          </label>
          <input
            type="password"
            name="password"
            required
            value={userData.password}
            onChange={appendUserData}
            placeholder="Insira a sua senha"
          />
        </div>
      </div>
      {showFormRegister ? (
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="passwordConfirmation">
              <IoKeyOutline />
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              required
              value={userData.passwordConfirmation}
              onChange={appendUserData}
              placeholder="Confirme a sua senha"
            />
          </div>
        </div>
      ) : (
        false
      )}
      {showFormRegister ? (
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="date">
              <IoCalendarNumberSharp />
            </label>
            <input
              type="date"
              name="passwordConfirmation"
              required
              value={userData.passwordConfirmation}
              onChange={appendUserData}
              placeholder="Informe a data de nascimento"
            />
          </div>
        </div>
      ) : (
        false
      )}
      {showFormRegister ? (
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="tel">
              <IoCallSharp />
            </label>
            <InputMask
              type="tel"
              name="phone"
              required
              value={userData.phone}
              onChange={appendUserData}
              mask="(99) 99999-9999"
              placeholder="(   ) _____-____"
            />
          </div>
        </div>
      ) : (
        false
      )}
      {loginErrorMsg && !showFormRegister ? (
        <span>{loginErrorMsg}</span>
      ) : registerErrorMsg && showFormRegister ? (
        <span>{registerErrorMsg}</span>
      ) : (
        false
      )}
      <div className={styles.btns}>
        {showFormRegister ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowFormRegister(false);
            }}
            className={styles.submit}
          >
            Voltar
          </button>
        ) : (
          <input type="submit" className={styles.submit} value="Login" />
        )}
        {!showFormRegister ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowFormRegister(true);
            }}
            className={styles.btnSignUp}
          >
            Cadastrar
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              register(userData);
            }}
            className={styles.btnSignUp}
          >
            Cadastrar
          </button>
        )}
      </div>
    </form>
  );
}
