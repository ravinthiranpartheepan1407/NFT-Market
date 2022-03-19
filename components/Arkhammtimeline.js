import React from "react";

function Arkhammtimeline(){
  return(
    <ol className="bg-background p-24 flex justify-center items-center sm:flex">
    <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
            <div className="flex z-10 justify-center items-center w-6 h-6 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pr-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">NFT Minting</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Launching on March 31</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Arkhamm NFT Minting Engine.</p>
        </div>
    </li>
    <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
            <div className="flex z-10 justify-center items-center w-6 h-6 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pr-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">ICO</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Launching on April 15</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Arkhamm Initial Coin Offering.</p>
        </div>
    </li>
    <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
            <div className="flex z-10 justify-center items-center w-6 h-6 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pr-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">DAO</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Launching on May 15</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Arkhamm De-centralized Autonomous Organization</p>
        </div>
    </li>
    <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
            <div className="flex z-10 justify-center items-center w-6 h-6 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pr-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">De-Fi</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Launching on June 15</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Arkhamm Decentralized Finance.</p>
        </div>
    </li>
    <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
            <div className="flex z-10 justify-center items-center w-6 h-6 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pr-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Yield Farming</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Launching on July 15</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Arkhamm Yield Farming and Liquidity Validation.</p>
        </div>
    </li>
</ol>
  )
}

export default Arkhammtimeline;