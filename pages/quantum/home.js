import React, {useState, useEffect} from "react";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Image from "next/image"
import {useRouter} from "next/router";

function Dashboard(){
  const router = useRouter();
  return(
    <div className="bg-cybornheader">
    <CybornHeader />
    <section className="relative bg-background">
        <img
          className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
          src="/Book.jpg"
        />

        <div className="hidden sm:block sm:inset-0 sm:absolute"></div>
        <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div className="text-left sm:text-left lg:grid grid-cols-2">
          <div className="p-8">
            <Image className="rounded-lg" src="/QuantArkhamm.png" width={400} height={400} />
          </div>
          <div className="p-8">
            <h1 className="xl:text-5xl md:text-4xl text-2xl font-extrabold leading-tight text-left text-white sm:mb-0 mb-12">
              Curious about our Quantum-Blockchain based data encryption?
            </h1>

            <p className="text-left mt-4 lg:text-2xl text-white sm:leading-relaxed sm:text-xl">
              Include our quant-block data encryption to your smartcontracts or in your other developments to secure your data from de-ciphering and quantum mining.
            </p>

            <br />

            <div className="flex gap-4 mt-8 text-left">
              <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
              </button >

              <button className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-black sm:w-auto focus:outline-none focus:ring" onClick={()=>router.push("/services/apps")}>
                View Dashboard
              </button >
              </div>
            </div>
          </div>
        </div>
      </section>
      <CybornFooter />
    </div>
  )
}

export default Dashboard;
