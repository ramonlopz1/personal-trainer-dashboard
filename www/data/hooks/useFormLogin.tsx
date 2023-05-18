import { signIn } from "next-auth/react";
import Router from "next/router";
import { ChangeEvent, useState } from "react";

interface IUserFormData {
  name?: string;
  birthDate?: Date;
  email: string;
  password: string;
  passwordConfirmation?: string;
  role: string
}

export default function useFormLogin() {
  const [userData, setUserInfo] = useState<IUserFormData>({
    email: "",
    password: "",
    role: "USER"
  });
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showFormRegister, setShowFormRegister] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");

  const appendUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const propName = event.target.name;
    const propValue = event.target.value;
    setUserInfo({ ...userData, [propName]: propValue });
  };

  const login = async (e: any) => {
    e.preventDefault();
    // pass the input values to credentials variable that will be utilized in auth.js (backend)
    const res = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    if (res?.error) setLoginErrorMsg("Credenciais inválidas");
    else Router.push("/protected");
  };

  const register = ({
    name,
    email,
    password,
    passwordConfirmation,
  }: IUserFormData) => {
    if (!name || !email || !password || !passwordConfirmation) {
      setRegisterErrorMsg("Campos pendentes...");
      return;
    }

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
