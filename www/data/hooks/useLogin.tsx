import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

export default function useLogin() {
  const { data: session } = useSession();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const setEmail = (email: string) => {
    setUserInfo({ ...userInfo, email });
  };

  const setPassword = (password: string) => {
    setUserInfo({ ...userInfo, password });
  };

  const login = async (e: any) => {
    e.preventDefault();

    // pass the input values to credentials variable that will be utilized in auth.js (backend)
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.error) Router.push("/");
    else Router.push("/protected")
  };

  return {
    session,
    userInfo,
    setEmail,
    setPassword,
    login,
  };
}
