import React from "react"
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head'
import MarketHeader from "/components/MarketHeader"
import CybornFooter from "/components/CybornFooter"
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Link from 'next/link'
import Image from 'next/image'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import { ARKHAMM_BRANDTKN_ADDRESS, ARKHAMM_BRAND_ADDRESS, ARKHAMM_BRAND_ABI, ARKHAMM_BRANDTKN_ABI} from '/constants'



function Verifier(){
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(ARKHAMM_BRANDTKN_ADDRESS, ARKHAMM_BRANDTKN_ABI, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    contract = new ethers.Contract(ARKHAMM_BRAND_ADDRESS, ARKHAMM_BRAND_ABI, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(ARKHAMM_BRANDTKN_ADDRESS, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/nft/home')
  }
  return(
    <div>
    <MarketHeader />
    <div className="h-screen font-Ubuntu w-screen antialiased">
          <ToastContainer position="top-left"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
      <Head>
        <title>Arkhamm Web3</title>
        <meta name="description" content="Arkhamm Blockchain" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
      </Head>
      <div className="bg-background flex h-full flex-col md:flex-row">
        <div className="p-10 flex-1 flex flex-col justify-center md:p-20">
          <div className="flex flex-col items-center md:items-start">
              <h1 className="text-white text-5xl text-extrabold"> Verify Your Product/Brand </h1>
              <input
                placeholder="Product / Brand Name"
                className="mt-8 border rounded p-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}

              />
                <br />
              <textarea
                placeholder="Product / Brand URL"
                className="mt-2 border rounded p-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}

              />
                <br />
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">This is for Arkhamm Market fee and the second transaction will be for token minting fee* </div>
              <input
                placeholder="Product / Brand Upload Fee"
                className="mt-2 border rounded p-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                value="0.001" disabled
              />
              <br />
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Upload Manual QR(Optional)</div>
              <input name="Asset" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChange} type="file" />
              <br />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Your Uploaded will be shown on right side*</div>
                <br />
              <button onClick={createMarket} className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
                Verify
              </button>

          </div>
        </div>
        <div className="flex-1 shrink-0">
          <div className="flex-1 shrink-0 h-full w-full object-cover md:h-full">


          {
            fileUrl && (
              <div>
              <img className="rounded mt-4" width="500" height="500" src={fileUrl} />
              <video autoPlay loop className="rounded mt-4" width="500" height="500">
                <source src={fileUrl} />
              </video>
              </div>
            )
          }
          </div>
        </div>
      </div>
    </div>
    <CybornFooter />
    </div>
  )
}

export default Verifier;
