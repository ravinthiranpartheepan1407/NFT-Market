import React, {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
import GameHeader from "/components/GameHeader"
import GameHead from "/components/GameHead"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head";

function Home(){
  const router = useRouter();
  const vidRef = useRef();

  return(
    <div>
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
    <GameHead />

    <section className="relative bg-background">
    <video
      className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
      src="/Teaser.mp4"
      autoPlay loop playsInline ref={ vidRef }
    />

      <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

      <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl text-center sm:text-left">
        <br />
          <div className="flex flex-wrap gap-4 mt-8 text-center">


          </div>
        </div>
      </div>
    </section>
    <CybornFooter />
  </div>
  )

}

export default Home;
