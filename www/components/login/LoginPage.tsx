import { signIn } from "next-auth/react";
import { ImFacebook2, ImGoogle, ImMail4 } from "react-icons/im";
import styles from "./LoginPage.module.css";
import useLogin from "@/data/hooks/useLogin";
import Form from "./organisms/Form";

export default function LoginPage() {
  const { showForm, setShowForm, userInfo, setEmail, setPassword, login } =
    useLogin();

  return (
    <div className={styles.container}>
      <h1>Bem vindo ao PedeMais</h1>
      <h4>Acesse sua conta</h4>
      {showForm ? (
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

          <button className={styles.email} onClick={() => setShowForm(true)}>
            <ImMail4 />
            <span>E-mail</span>
          </button>
        </div>
      )}
      {showForm ? (
        <Form
          onSubmit={login}
          email={userInfo.email}
          password={userInfo.password}
          setEmail={setEmail}
          setPassword={setPassword}
          setShowForm={setShowForm}
        />
      ) : (
        false
      )}
    </div>
  );
}
