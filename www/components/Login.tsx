import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Login.module.css";
import useLogin from "@/data/hooks/useLogin";

export default function Component() {
  const { session, userInfo, setEmail, setPassword, login } = useLogin();

  return (
    <div className={styles.login_container}>
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
        <button onClick={() => signIn("google")}>Google</button>
        <button onClick={() => signIn("facebook")}>Facebook</button>
      </form>
    </div>
  );
}
