import { signOut, useSession } from "next-auth/react";
import ForceAuthentication from "../authentication/ForceAuthentication";
import Boxed from "./Boxed";
import styles from "./Page.module.css";
import Link from "next/link";
interface PageProps {
  extern?: boolean;
  children: any;
  className?: string;
}

export default function Page(props: PageProps) {
  const { data: session } = useSession();
  const role = session?.role;
  const userId = session?.user?.id;

  function render() {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.logo}></div>
          <div className={styles.headerBtns}>
            {role === "ADMIN" ? (
              <Link
                className={styles.btnCustomers}
                href={`/customers?providerId=${userId}`}
              >
                Clientes
              </Link>
            ) : (
              false
            )}
            {props.extern ? (
              false
            ) : (
              <button className={styles.signOut} onClick={() => signOut()}>
                Sair
              </button>
            )}
          </div>
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
