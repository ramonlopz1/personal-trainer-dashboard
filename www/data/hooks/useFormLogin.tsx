import ValidatorFormLogin from "@/logic/validators/ValidatorFormLogin";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { ChangeEvent, useState } from "react";

interface IUserFormData {
  name?: string;
  birthDate?: Date;
  email: string;
  password: string;
  passwordConfirmation?: string;
  role: string;
}

export default function useFormLogin() {
  const [userData, setUserInfo] = useState<IUserFormData>({
    email: "",
    password: "",
    role: "USER",
  });
  const [showFormLogin, setShowFormLogin] = useState<boolean>(false);
  const [showFormRegister, setShowFormRegister] = useState<boolean>(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string>("");
  const [registerValidationMsg, setRegisterValidationMsg] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    birthDate: "",
    phone: ""
  });

 

  const appendUserData = (event: ChangeEvent<HTMLInputElement>) => {
    validator(event)
    setUserInfo({ ...userData, [event.target.name]: event.target.value });
  };

  const validator = (event: ChangeEvent<HTMLInputElement>) => {
    const validator = new ValidatorFormLogin()
    const inputName = event.target.name
    const inputValue = event.target.value

    if(inputName === 'name') {
      setRegisterValidationMsg({...registerValidationMsg, name: validator.name(inputValue)})
     
    } else if (inputName === 'email') {
      setRegisterValidationMsg({...registerValidationMsg, email: validator.email(inputValue)})
    } else if (inputName === 'password') {
      setRegisterValidationMsg({...registerValidationMsg, password: validator.password(inputValue)})
    } else if (inputName === 'passwordConfirmation') {
      setRegisterValidationMsg({...registerValidationMsg, passwordConfirmation: validator.password(inputValue)})
    } else if (inputName === 'date') {
      setRegisterValidationMsg({...registerValidationMsg, birthDate: validator.birthDate(inputValue)})
    }  else if (inputName === 'phone') {
      setRegisterValidationMsg({...registerValidationMsg, phone: validator.phone(inputValue)})
    }
  }

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

  const register = ({
  }: IUserFormData) => {

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((data) => data.text())
      .then(setRegisterErrorMsg)
      .catch(setRegisterErrorMsg);
  };

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
  };
}
