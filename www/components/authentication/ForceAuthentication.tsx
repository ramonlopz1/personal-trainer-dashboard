import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../templates/Loading";

interface ForceAuthenticationProps {
  children: any;
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (!session) {
    router.push("/");
  }

  if (session) {
    return <div>{props.children}</div>;
  }

  return null; // or show loading state, error message, etc.
}
