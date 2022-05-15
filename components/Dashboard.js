import React, {useState, useEffect} from "react";
function Dashboard(){
  return(
    <div className="bg-cybornheader">
    <section className="relative bg-background">
        <img
          className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
          src="/Service.jpg"
        />

        <div className="hidden sm:block sm:inset-0 sm:absolute"></div>
        <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div className="text-center sm:text-left">
            <h1 className="xl:text-5xl md:text-4xl text-2xl font-extrabold leading-tight text-center text-white sm:mb-0 mb-12">
              Curious about our Quantum-Blockchain based data encryption?
            </h1>

            <p className="text-center mt-4 lg:text-2xl text-white sm:leading-relaxed sm:text-xl">
              Include our quant-block data encryption to your smartcontracts or in your other developments to secure your data from de-ciphering and quantum mining.
            </p>

            <br />

            <div className="flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-wrap gap-4 mt-8 text-center">
              <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Download
              </button >

              <button className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-black sm:w-auto focus:outline-none focus:ring">
                Read Whitepaper
              </button >
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard;
