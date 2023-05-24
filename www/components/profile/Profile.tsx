import { useSession } from "next-auth/react";
import styles from "./Profile.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);

  const id = user?.id;

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h3>Olá, {user?.name}</h3>
    </div>
  );
}
