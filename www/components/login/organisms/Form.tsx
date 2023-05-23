import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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
  registerErrorMsgs: string;
  registerValidationMsgs: any;
  setShowFormLogin: Dispatch<SetStateAction<boolean>>;
  setShowFormRegister: Dispatch<SetStateAction<boolean>>;
  showFormRegister: boolean;
  appendUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  login: (e: any) => Promise<void>;
  register: (e: any) => void;
  enableBtn: boolean;
}

export default function Form({
  userData,
  loginErrorMsg,
  registerErrorMsgs,
  registerValidationMsgs,
  setShowFormLogin,
  setShowFormRegister,
  showFormRegister,
  appendUserData,
  login,
  register,
  enableBtn,
}: FormProps): JSX.Element {
  console.log(enableBtn)
  return (
    <form onSubmit={login} className={styles.form}>
      <button
        className={styles.btnBack}
        onClick={() => setShowFormLogin(false)}
      >
        <IoArrowBack />
      </button>
      {showFormRegister ? (
        <>
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
          <span className={styles.inputErrorMsg}>
            {registerValidationMsgs.name}
          </span>
        </>
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
            autoComplete="false"
            required
            value={userData.email}
            onChange={appendUserData}
            placeholder="email@email.com"
          />
        </div>
        <span className={styles.inputErrorMsg}>
          {registerValidationMsgs.email}
        </span>
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
        <span className={styles.inputErrorMsg}>
          <span className={styles.inputErrorMsg}>
            {registerValidationMsgs.password}
          </span>
        </span>
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
          <span className={styles.inputErrorMsg}>
            {registerValidationMsgs.passwordConfirmation}
          </span>
        </div>
      ) : (
        false
      )}
      {showFormRegister ? (
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="birthDate">
              <IoCalendarNumberSharp />
            </label>
            <input
              type="date"
              name="birthDate"
              required
              value={userData.birthDate}
              onChange={appendUserData}
              placeholder="Informe a data de nascimento"
            />
          </div>
          <span className={styles.inputErrorMsg}>
            <span className={styles.inputErrorMsg}>
              {registerValidationMsgs.birthDate}
            </span>
          </span>
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
              placeholder="(  ) _____-____"
            />
          </div>
          <span className={styles.inputErrorMsg}>
            {registerValidationMsgs.phone}
          </span>
        </div>
      ) : (
        false
      )}
      {loginErrorMsg && !showFormRegister ? (
        <span>{loginErrorMsg}</span>
      ) : registerErrorMsgs && showFormRegister ? (
        <span>{registerErrorMsgs}</span>
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
            disabled={true}
          >
            Cadastrar
          </button>
        )}
      </div>
    </form>
  );
}
