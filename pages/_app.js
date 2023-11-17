"use client";
import "../styles/globals.css";
import "../styles/pages.css";
import "../styles/loader.css";
import Provider from "../context/Provider";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
})
{
  console.log(session);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
