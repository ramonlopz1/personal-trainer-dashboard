import { signIn } from "next-auth/react";
import { ImFacebook2, ImGoogle, ImMail4 } from "react-icons/im";
import styles from "./LoginPage.module.css";
import useFormLogin from "@/data/hooks/useFormLogin";
import Form from "./organisms/Form";

export default function LoginPage() {
  const {
    showFormLogin,
    setShowFormLogin,
    setShowFormRegister,
    showFormRegister,
    userData,
    appendUserData,
    login,
    loginErrorMsg,
    register,
    registerErrorMsg,
  } = useFormLogin();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem vindo ao PedeMais</h1>
      <h4 className={styles.subtitle}>Acesse sua conta</h4>
      {showFormLogin ? (
        false
      ) : (
        <div className={styles.socialLogin}>
          <button className={styles.google} onClick={() => signIn("google")}>
            <ImGoogle />
            <span>Google</span>
          </button>
          <button
            className={styles.facebook}
            onClick={() => signIn("facebook")}
          >
            <ImFacebook2 />
            <span>Facebook</span>
          </button>

          <button
            className={styles.email}
            onClick={() => setShowFormLogin(true)}
          >
            <ImMail4 />
            <span>E-mail</span>
          </button>
        </div>
      )}
      {showFormLogin ? (
        <Form
          login={login}
          register={register}
          userData={userData}
          loginErrorMsg={loginErrorMsg}
          registerErrorMsg={registerErrorMsg}
          appendUserData={appendUserData}
          setShowFormLogin={setShowFormLogin}
          setShowFormRegister={setShowFormRegister}
          showFormRegister={showFormRegister}
        />
      ) : (
        false
      )}
    </div>
  );
}
