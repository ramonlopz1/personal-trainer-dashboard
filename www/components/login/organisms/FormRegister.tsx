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
  registerErrorMsgs: string;
  registerValidationMsgs: any;
  appendUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  register: (e: any) => void;
  enableBtn: boolean;
  uploadImg: any;
}

export default function Form({
  userData,
  registerErrorMsgs,
  registerValidationMsgs,
  appendUserData,
  register,
  uploadImg,
  enableBtn
}: FormProps): JSX.Element {
  return (
    <form className={styles.form}>
      <>
        <div className={styles.inputs}>
          <div className={styles.inputImg}>
            <label htmlFor="img"></label>
            <input
              type="file"
              name="img"
              onChange={uploadImg}
              placeholder="Insira o seu nome"
            />
          </div>
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

      {registerErrorMsgs ? <span>{registerErrorMsgs}</span> : false}
      <Link href="">Esqueceu a senha?</Link>
      <div className={styles.btns}>
        <Link href={""} className={styles.submit}>
          Voltar
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            register(userData);
          }}
          className={styles.btnSignUp}
          disabled={enableBtn}
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
