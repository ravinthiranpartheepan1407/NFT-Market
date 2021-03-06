import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head";
function Home(){
  const router = useRouter();
  return(
    <div>
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
    <CybornHeader />
    <section className="relative bg-background">
      <img
        className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
        src="/Game3.png"
      />

      <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

      <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
            Curious About Our 3D Based NFT FPS Game?
          </h1>

          <p className="max-w-lg mt-4 text-white sm:leading-relaxed sm:text-xl">
            World&apos;s one of the best gaming platform to provide game based NFT assests, DAO, DEx, amd VR NFT Showroom Integration Features within one game.
          </p>

          <div className="flex flex-wrap gap-4 mt-8 text-center">
            <button onClick={()=> router.push("/game/mint")} className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
              Mint Arkhamm Game Tag
            </button>

            <button className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-black sm:w-auto focus:outline-none focus:ring">
              Download(Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </section>
    <CybornFooter />
  </div>
  )
}

export default Home;
