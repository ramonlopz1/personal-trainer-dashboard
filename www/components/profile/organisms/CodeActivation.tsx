import { useState, useEffect } from "react";
import OneTimeInput from "./OneTimeInput";
import styles from "./CodeActivation.module.css";
import { useSession, getSession } from "next-auth/react";

export default function CodeActivation() {
  const [code, setCode] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // session was implemented in this way to remove an typescript error when using useSession hook
  const [session, setSession] = useState<any>();
  useEffect(() => {
    getSession().then(setSession);
  }, []);

  const onSubmitHandler = (code: string) => {
    setStatus("Verificando código...");
    fetch("/api/raffledCodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raffleCode: code,
        ownerId: session?.user?.id,
      }),
    })
      .then((res) => res.text())
      .then(setStatus)
      

    
  };

  return (
    <div className={styles.codeActivation}>
      <span>Ativar código:</span>
      <OneTimeInput setCode={setCode} code={code} />
      <input
        onClick={() => onSubmitHandler(code)}
        type="submit"
        value="Ativar"
      />
      <span>{status}</span>
    </div>
  );
}
