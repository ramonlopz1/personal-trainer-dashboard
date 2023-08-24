import { signIn } from "next-auth/react";
import { ImFacebook2, ImGoogle, ImMail4 } from "react-icons/im";
import styles from "./Login.module.css";
import useFormLogin from "@/data/hooks/useFormLogin";
import FormRegister from "./organisms/FormRegister";

export default function Register() {
  const {
    userData,
    appendUserData,
    register,
    registerErrorMsgs,
    registerValidationMsgs,
    enableBtn,
    uploadImg,
  } = useFormLogin();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem vindo ao PedeMais</h1>
      <h4 className={styles.subtitle}>Acesse sua conta</h4>

      <FormRegister

        register={register}
        userData={userData}
        registerErrorMsgs={registerErrorMsgs}
        registerValidationMsgs={registerValidationMsgs}
        appendUserData={appendUserData}
        enableBtn={enableBtn}
        uploadImg={uploadImg}
      />
    </div>
  );
}
