import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import CybornHeader from "/components/CybornHeader";
import CybornFooter from "/components/CybornFooter";

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
        src="/win2.jpg"
      />

      <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

      <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
            Curious About Our De-Centralized Health Insurance Policy?
          </h1>

          <p className="max-w-lg mt-4 text-white sm:leading-relaxed sm:text-xl">
            We offer service to the patients more control over their data with improved accuracy and Quantum-Blockchain based encryption for EHRs, make healthcare services more accessible, and reduce healthcare costs.
          </p>

          <div className="flex flex-wrap gap-4 mt-8 text-center">
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
              Go To Insurance Dashboard (Coming Soon)
            </button>

            <button className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-black sm:w-auto focus:outline-none focus:ring">
              How it works?
            </button>
          </div>
        </div>
      </div>
    </section>
    <CybornFooter />
  </div>
);
}

export default Home;
