import React, {useState} from 'react'
import Link from "next/link"
import QRcode from 'qrcode.react'
import {useRouter} from "next/router";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head"

function QRgen() {
    const [qr, setQr] = useState("Arkhamm Brand Verification");
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "arkhammqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

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
          src="/ENS.png"
        />

        <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

        <div className="lg:grid grid-cols-2 gap-4 relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">

        <div>
        <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
          Generate Ark QR for your Brand or Product Verification in Arkhamm on-chain Market
        </h1>
        <div style={{marginTop:30}}>
            <input onChange={handleChange} placeholder="Enter Your Product / Brand URL" style={{width:420}} className="bg-background border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={qr} label="QR content" size="large" variant="outlined" color="primary"
            />
        </div>
        </div>

          <div className="max-w-xl text-center sm:text-left">

          <br />


          <div>
              {

                  <QRcode
                      id="myqr"
                      value={qr}
                      size={320}
                      includeMargin={true}
                  />
              }
          </div>
          <br />
          <div>
              {
                  qr ?
                  <div container>
                      <br />
                      <div item xs={2}>
                      <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" onClick={downloadQR} style={{marginLeft:10}} color="primary">
                          Download
                      </button>
                      </div>
                  </div> :
                  ''
              }
          </div>
          </div>

        </div>
      </section>
      <CybornFooter />
    </div>
    )
  }

  export default QRgen;
