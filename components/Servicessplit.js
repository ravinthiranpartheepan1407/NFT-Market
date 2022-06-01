import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
function Servicessplit(){
  const router = useRouter();
  return(
    <div>
    <br />
    <br />
    <h1 className="xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center text-white sm:mb-0 mb-12"> Our Apps </h1>
    <div className="lg:grid grid-cols-3 gap-16 lg:p-32">

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Cloud</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button onClick={()=>router.push("/cloud/Home")} className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
              View
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Brand Verification</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button onClick={()=> router.push("/brand/Home")} className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                View
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Hosting</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Blog</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Code Hub</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Meet</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ENS</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NFT Mint Engine</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Game</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NFT VR</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Management</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you are curious about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                  Coming Soon
            </button>
        </div>
      </div>

      <div className="max-w-sm bg-white rounded-lg p-8 shadow-md bg-cybornheader">

        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">De-Movie</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We know that you curious are about this product, we will definitely fulfill your expectations!</p>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Coming Soon
            </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Servicessplit;
