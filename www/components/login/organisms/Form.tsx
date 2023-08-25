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
import Link from "next/link";

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
  uploadImg: any;
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
  uploadImg,
}: FormProps): JSX.Element {
  return (
    <form onSubmit={login} className={styles.form}>
    
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
   
   
      {loginErrorMsg && !showFormRegister ? (
        <span>{loginErrorMsg}</span>
      ) : registerErrorMsgs && showFormRegister ? (
        <span>{registerErrorMsgs}</span>
      ) : (
        false
      )}
      <Link href="">Esqueceu a senha?</Link> 
      <div className={styles.btns}>
     
          <input type="submit" className={styles.submit} value="Login" />
      
      </div>
      {showFormRegister ? (
        false
      ) : (
        <button
          className={styles.btnBack}
          onClick={() => setShowFormLogin(false)}
        >
          <IoArrowBack />
        </button>
      )}
    </form>
  );
}
