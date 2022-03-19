import React from "react";
import Link from "next/link";
function CybornHeader(){
  return(
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-cybornheader">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <a href="#" className="flex">
      <img width={100} height={100} className="rounded" src ="/ark.png" />
    </a>
    <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">

      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-base font-bold md:text-cybornheadertext block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
        <li>
          <Link href="#" className="text-base font-bold block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-cybornheadertext md:p-0" aria-current="page">Home</Link>
        </li>
        <li>
          <Link href="#" className="text-base font-bold block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:text-cybornheadertext md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">De-Fi</Link>
        </li>
        <li>
          <Link href="#" className="text-base font-bold block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:text-cybornheadertext md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-cybornheadertext md:dark:hover:bg-transparent dark:border-gray-700">NFT Marketplace</Link>
        </li>
        <li>
          <Link href="/launchmint/whitelist" className="text-base font-bold md:text-cybornheadertext block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Minting</Link>
        </li>
        <li>
          <Link href="#" className="text-base font-bold md:text-cybornheadertext block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">DAO</Link>
        </li>
        <li>
          <Link href="#" className="text-base font-bold md:text-cybornheadertext block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Join Arkhamm.edu</Link>
        </li>
        <li>
          <Link href="#" className="text-base font-bold md:text-cybornheadertext block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Jobs</Link>
        </li>
        <li>
        <button type="button" className="text-gray-900 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-2 py-2 mt-0 text-center inline-flex items-center">
          <img width={18} height={18} src="/metamask.svg" /> &nbsp; Connect with MetaMask
        </button>
        </li>

      </ul>
    </div>
  </div>
</nav>
  )
}

export default CybornHeader;
