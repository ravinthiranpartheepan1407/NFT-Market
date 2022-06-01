import React, {useState, useEffect} from "react"
import Link from "next/link"
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head";
import { QrReader } from "react-qr-reader";

export default function QRScanner() {

    const [qrscan, setQrscan] = useState("No result");
    const handleScan = data => {
        if (data) {
            setQrscan(data)
        }
    }
    const handleError = err => {
    console.error(err)
    }

    return (
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
            <h1 className="text-white text-3xl font-bold"> Arkhamm Brand or Product QR Scanner </h1>
            <div style={{marginTop:30}}>
                <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ height: 240, width: 320 }} />
            </div>

            <textarea className="bg-background border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 p-8 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 text-center dark:focus:border-blue-500" style={{fontSize:18, width:320, height:100, marginTop:100}} rowsMax={4} defaultValue={qrscan} value={qrscan} />

            </div>
          </div>
        </section>
      <CybornFooter />
    </div>
    );
  }
