import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Stockify</title>
        <meta
          name="description"
          content="the best site to get all the informations about stock market"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
