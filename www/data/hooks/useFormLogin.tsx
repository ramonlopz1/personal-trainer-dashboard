import ValidatorFormLogin from "@/logic/validators/ValidatorFormLogin";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import { constUser, constRegisterValidationMsgs } from "../constants/constants";

interface IUserFormData {
  name?: string;
  birthDate?: Date;
  email: string;
  password: string;
  passwordConfirmation?: string;
  role: string;
}

export default function useFormLogin() {
  // set up the values inserted in the inputs, to an object
  const [userData, setUserInfo] = useState<IUserFormData>(constUser);

  // flag to enable or disable register btn
  const [enableBtn, setEnableBtn] = useState<boolean>(true);

  // flag to show or hide the form login
  const [showFormLogin, setShowFormLogin] = useState<boolean>(false);

  // flag to show or hide the form register
  const [showFormRegister, setShowFormRegister] = useState<boolean>(false);

  // set the api error to the form login
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");

  // set the api error to the form register
  const [registerErrorMsgs, setRegisterErrorMsgs] = useState<string>("");

  // create an object to retrieve each input validation msg, based on inputname
  const [registerValidationMsgs, setRegisterValidationMsgs] = useState(
    constRegisterValidationMsgs
  );

  // setup the validator msgs, setup activation of btnRegister and setup the object that contains the values inputted by user
  const appendUserData = (event: ChangeEvent<HTMLInputElement>) => {
    validator(event);
    enableBtnRegister();
    setUserInfo({ ...userData, [event.target.name]: event.target.value });
  };

  // validator will setup each error message based on input name
  const validator = (event: ChangeEvent<HTMLInputElement>) => {
    const validator = new ValidatorFormLogin();
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "name") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        name: validator[inputName](inputValue),
      });
    } else if (inputName === "email") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        email: validator.email(inputValue),
      });
    } else if (inputName === "password") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        password: validator.password(inputValue),
      });
    } else if (inputName === "passwordConfirmation") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        passwordConfirmation: validator.passwordConfirmation(
          userData.password,
          inputValue
        ),
      });
    } else if (inputName === "birthDate") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        birthDate: validator.birthDate(inputValue),
      });
    } else if (inputName === "phone") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        phone: validator.phone(inputValue),
      });
    }
  };

  const login = async (e: any) => {
    e.preventDefault();

    // pass the input values to credentials variable that will be utilized in auth.js (backend)
    const res = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    if (!res || res?.error) setLoginErrorMsg("Credenciais inválidas");
    else Router.push("/protected");
  };

  const register = (userData: IUserFormData) => {
    const { passwordConfirmation, ...user } = userData;

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((data) => data.text())
      .then(setRegisterErrorMsgs)
      .catch(setRegisterErrorMsgs);
  };

  const enableBtnRegister = () => {
    const validationMsgs = Object.values(registerValidationMsgs);
    const errors = validationMsgs.filter((msg) => msg.length > 1);
    if (errors.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  };

  return {
    showFormLogin,
    registerValidationMsgs,
    setShowFormLogin,
    showFormRegister,
    setShowFormRegister,
    userData,
    appendUserData,
    login,
    loginErrorMsg,
    register,
    registerErrorMsgs,
    enableBtn,
  };
}
