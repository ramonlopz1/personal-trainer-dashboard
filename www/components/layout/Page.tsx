import { signOut } from "next-auth/react";
import ForceAuthentication from "../authentication/ForceAuthentication";
import Boxed from "./Boxed";
import styles from "./Page.module.css";
interface PageProps {
  extern?: boolean;
  children: any;
  className?: string;
}

export default function Page(props: PageProps) {
  function render() {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.logo}></div>
          {props.extern ? (
            false
          ) : (
            <button onClick={() => signOut()}>Sair</button>
          )}
        </header>
        <Boxed>
          <section className={styles.section}>{props.children}</section>
        </Boxed>
      </main>
    );
  }

  return props.extern ? (
    render()
  ) : (
    <ForceAuthentication>{render()}</ForceAuthentication>
  );
}
