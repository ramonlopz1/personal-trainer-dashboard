// import Carregando from '../template/Carregando'
import { useSession } from "next-auth/react";

interface ForceAuthenticationProps {
  children: any;
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {
  const { data: session } = useSession();
  console.log(session);

  return props.children;
  //   if (carregando) {
  //     return <Carregando />
  //   } else if (usuario?.email) {
  //     return props.children;
  //   } else {
  //     router.push("/");
  //     // return <Carregando />
  //   }
}
