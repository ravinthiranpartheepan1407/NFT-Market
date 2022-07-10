import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaWindows, FaAndroid } from "react-icons/fa";
function Winapk() {
  const router = useRouter();
  return (
    <div className="bg-cybornheader">
      <section className="relative bg-background">
        <img
          className="absolute inset-0 object-[75%] sm:object-[25%] object-cover bg-gradient-to-r from-cybornheader to-bg-purple-900  w-full h-full"
          src="/Product.jpg"
        />

        <div className="hidden sm:block sm:inset-0 sm:absolute"></div>
        <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div className="text-center sm:text-left">
            <h1 className="xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center text-white sm:mb-0 mb-12">
              Get our software in windows, and android devices?
            </h1>

            <p className="text-center mt-4 lg:text-2xl text-white sm:leading-relaxed sm:text-xl">
              We have our apps available on Windows, and Android platforms.
            </p>

            <br />

            <div className="inline-flex items-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-wrap gap-4 mt-8 text-center">
              <button
                type="button"
                onClick={() =>
                  router.push(
                    "https://github.com/ravinthiranpartheepan1407/NFT-Market/releases/download/arkhamm/Arkhamm.Setup.1.0.0.exe"
                  )
                }
                className="px-12 py-3 text-sm font-medium text-black rounded shadow font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
              >
                <FaWindows className="text-black" />
                &nbsp; Windows
              </button>

              <button
                type="button"
                className="px-12 py-3 text-sm font-medium text-black rounded shadow font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
              >
                <FaAndroid className="text-black" />
                &nbsp; Android
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Winapk;
