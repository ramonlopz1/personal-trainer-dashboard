import ValidatorFormLogin from "@/logic/validators/ValidatorFormLogin";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { constUser } from "../constants/constants";

interface IUserFormData {
  name?: string;
  birthDate?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  role: string;
}

interface IValidationMsgs {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  birthDate?: string;
  phone?: string;
}

export default function useFormLogin() {
  const { data: session } = useSession();
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
  const [registerValidationMsgs, setRegisterValidationMsgs] =
    useState<IValidationMsgs>({});

  // setup the validator msgs, setup activation of btnRegister and setup the object that contains the values inputted by user
  const appendUserData = (event: ChangeEvent<HTMLInputElement>) => {
    validator(event);
    setUserInfo({ ...userData, [event.target.name]: event.target.value });
  };

  // validator will setup each error message based on input name
  const validator = (event: ChangeEvent<HTMLInputElement>) => {
    const validator = new ValidatorFormLogin();
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "passwordConfirmation" || inputName === "password") {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        passwordConfirmation: validator.password(userData.password, inputValue),
      });
    } else {
      setRegisterValidationMsgs({
        ...registerValidationMsgs,
        [inputName]: validator[inputName](inputValue),
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
    else Router.push(`/profile?id=${session?.user?.id}`);
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

  useEffect(() => {
    enableBtnRegister();
  }, [userData]);

  const enableBtnRegister = () => {
    const inputtedValues = Object.values(userData);
    const inputsNotFilled = inputtedValues.filter(
      (value) => value.length === 0
    );

    const validationMsgs = Object.values(registerValidationMsgs);
    const errors = validationMsgs.filter((msg) => msg.length > 1);
    if (errors.length > 0) {
      setEnableBtn(true);
    } else if (inputsNotFilled.length !== 0) {
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
