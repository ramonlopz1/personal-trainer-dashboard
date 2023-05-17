import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Login.module.css";
import { useState } from "react";
import Router from "next/router";
export default function Component() {
  const { data: session } = useSession();
  console.log(session);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // pass the input values to credentials variable that will be utilized in auth.js (backend)
    await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log("logged in");
    Router.push("/");
  };

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={styles.input_user}>
            <label htmlFor="user">User</label>
            <input
              type="text"
              name="user"
              required
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
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
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              id="user"
              placeholder="Insira a sua senha."
            />
          </div>
        </div>
        <input type="submit" className={styles.submit} value="Login" />
        <button onClick={() => signIn('google')}>Google</button>
        <button onClick={() => signIn('facebook')}>Facebook</button>
      </form>
    </div>
  );
}
