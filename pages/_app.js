"use client";
import "../styles/globals.css";
import "../styles/pages.css";
import "../styles/loader.css";
import { SessionProvider, useSession } from "next-auth/react";
import Header from "../components/Header";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const showHeader =
    router.pathname === "/login" || router.pathname === "/register"
      ? false
      : true;
  console.log(session);
  return (
    <SessionProvider session={session}>
      {showHeader && <Header />}
      {session === "authenticated" ? (
        <Component {...pageProps} />
      ) : !showHeader ? (
        <Component {...pageProps} />
      ) : "some other page"}
    </SessionProvider>
  );
}
