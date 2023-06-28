import { signOut, useSession } from "next-auth/react";
import ForceAuthentication from "../authentication/ForceAuthentication";
import { HiHome } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import Boxed from "./Boxed";
import styles from "./Page.module.css";
import Link from "next/link";
import Image from "next/image";
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
        {props.extern ? (
          false
        ) : (
          <header className={styles.header}>
            <div className={styles.logo}>
              <Image src="/logo.png" alt="logo" height={30} width={70} />
            </div>
            <div className={styles.headerBtns}>
              <Link className={styles.btnHome} href={`/profile?id=${userId}`}>
                <HiHome />
              </Link>
              {role === "ADMIN" ? (
                <Link
                  className={styles.btnCustomers}
                  href={`/customers?providerId=${userId}`}
                >
                  <BsFillPeopleFill />
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
        )}
        <Boxed>
          <section className={styles.section}>{props.children}</section>
        </Boxed>
        <footer className={styles.footer}>
          <span>Developed By Ramon Lopes</span>
          <span>PedeMais. © 2023 - Todos os direitos reservados.</span>
          <span>Fale conosco.</span>
        </footer>
      </main>
    );
  }

  return props.extern ? (
    render()
  ) : (
    <ForceAuthentication>{render()}</ForceAuthentication>
  );
}
