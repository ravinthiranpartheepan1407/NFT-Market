import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head";
import axios, { post } from 'axios';
function qrRead(){
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
        src="/ENS.png"
      />

      <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

      <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
            Curious About Our Brand / Product Verification Feature on Blockchain?
          </h1>
          <br />
          <form encType="multipart/form-data" action="http://api.qrserver.com/v1/read-qr-code/" method="POST">
            <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
            <br />
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="file" type="file" />
            <br />
            <input className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" type="submit" value="Read QR code" />
          </form>
          <br />
        </div>

      </div>
    </section>
    <CybornFooter />
  </div>
  )
}

export default qrRead;
