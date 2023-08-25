import { signIn } from "next-auth/react";
import { ImFacebook2, ImGoogle, ImMail4 } from "react-icons/im";
import styles from "./Register.module.css";
import useFormLogin from "@/data/hooks/useFormLogin";
import FormRegister from "./organisms/FormRegister";

interface RegisterProps {
  adminId: string;
}

export default function Register({ adminId }: RegisterProps) {
  return (
    <div className={styles.container}>
      <h4 className={styles.subtitle}>Cadastrar aluno</h4>

      <FormRegister adminId={adminId} />
    </div>
  );
}
