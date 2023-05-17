import { signIn } from "next-auth/react";
import { ImFacebook2, ImGoogle, ImMail4 } from 'react-icons/im'
import styles from "./LoginPage.module.css";
import useLogin from "@/data/hooks/useLogin";

export default function LoginPage() {
  const { userInfo, setEmail, setPassword, login } = useLogin();

  return (
    <div className={styles.container}>
      <h1>Bem vindo ao PedeMais</h1>
      <h4>Acesse sua conta</h4>
      <div className={styles.socialLogin}>
        <button className={styles.google} onClick={() => signIn("google")}>
          <ImGoogle/>
          <span>Google</span>
        </button>
        <button className={styles.facebook} onClick={() => signIn("facebook")}>
          <ImFacebook2/>
          <span>Facebook</span>
        </button>
        <button className={styles.email} onClick={() => signIn("facebook")}>
          <ImMail4/>
          <span>E-mail</span>
        </button>
      </div>
      <form onSubmit={login}>
        <div className={styles.inputs}>
          <div className={styles.input_user}>
            <label htmlFor="user">User</label>
            <input
              type="text"
              name="user"
              required
              value={userInfo.email}
              onChange={(e) => setEmail(e.target.value)}
              id="user"
              placeholder="Insira o seu usuário"
            />
          </div>
          <div className={styles.input_pass}>
            <label htmlFor="pass">Pass</label>
            <input
              type="password"
              name="pass"
              required
              value={userInfo.password}
              onChange={(e) => setPassword(e.target.value)}
              id="user"
              placeholder="Insira a sua senha."
            />
          </div>
        </div>
        <input type="submit" className={styles.submit} value="Login" />
      </form>
    </div>
  );
}
