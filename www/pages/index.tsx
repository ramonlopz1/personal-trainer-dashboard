import Head from "next/head";
import Login from "@/components/login/Login";
import Page from "@/components/layout/Page";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Image from "next/image";
import AsideImage from "@/components/login/AsideImage";

export default function LoginPage() {
  const { data: session } = useSession();
  //session.user.provider

  // ta salvando o usuário do google no mongo, mas ta dando algum erro

  if (session?.user.provider === "google") {
    fetch(`/api/users?socialId=${session?.user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        socialId: session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
        image: session?.user.image,
        password: "googlepassword",
      }),
    })
      .then((data) => data.json())
      .then((res) => Router.push(`/profile?id=${res.id}`));
  }

  if (session?.user.provider === "credentials") {
    Router.push(`/profile?id=${session?.user.id}`);
    return;
  } else {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Page extern>
          <div
            style={{
              display: "flex",
              boxShadow:
                "0 1px 4px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.06)",
              margin: "30px",
            }}
          >
            <AsideImage />
            <Login />
          </div>
        </Page>
      </>
    );
  }
}
