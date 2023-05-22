import ValidatorFormLogin from "@/logic/validators/ValidatorFormLogin";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import { constUser, constRegisterValidationMsg } from "../constants/constants";

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

  // flag to show or hide the form login
  const [showFormLogin, setShowFormLogin] = useState<boolean>(false);

  // flag to show or hide the form register
  const [showFormRegister, setShowFormRegister] = useState<boolean>(false);

  // set the api error to the form login
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");

  // set the api error to the form register
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string>("");

  // create an object to retrieve each input validation msg, based on inputname
  const [registerValidationMsg, setRegisterValidationMsg] = useState(
    constRegisterValidationMsg
  );

  // setup the validator msgs and setup the object that contains the values inputted by user
  const appendUserData = (event: ChangeEvent<HTMLInputElement>) => {
    validator(event);
    setUserInfo({ ...userData, [event.target.name]: event.target.value });
  };

  // validator will setup each error message based on input name
  const validator = (event: ChangeEvent<HTMLInputElement>) => {
    const validator = new ValidatorFormLogin();
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "name") {
      setRegisterValidationMsg({
        ...registerValidationMsg,
        name: validator[inputName](inputValue),
      });
    } else if (inputName === "email") {
      setRegisterValidationMsg({
        ...registerValidationMsg,
        email: validator.email(inputValue),
      });
    } else if (inputName === "password") {
      setRegisterValidationMsg({
        ...registerValidationMsg,
        password: validator.password(inputValue),
      });
    } else if (inputName === "passwordConfirmation") {
      setRegisterValidationMsg({
        ...registerValidationMsg,
        passwordConfirmation: validator.passwordConfirmation(
          userData.password,
          inputValue
        ),
      });
    } else if (inputName === "date") {
      setRegisterValidationMsg({
        ...registerValidationMsg,
        birthDate: validator.birthDate(inputValue),
      });
    } else if (inputName === "phone") {
      setRegisterValidationMsg({
        ...registerValidationMsg,
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
      .then(setRegisterErrorMsg)
      .catch(setRegisterErrorMsg);
  };


  const enableBtnRegister = () => {
    const msgs = Object.values(registerValidationMsg)

    const errors = msgs.filter(msg => msg.length > 0)
    console.log(errors)
    if(errors.length > 0) {
      return false
    }

    return true
  }
  return {
    showFormLogin,
    registerValidationMsg,
    setShowFormLogin,
    showFormRegister,
    setShowFormRegister,
    userData,
    appendUserData,
    login,
    loginErrorMsg,
    register,
    registerErrorMsg,
    enableBtnRegister
  };
}
