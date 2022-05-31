import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head";
import Link from "next/link";
import {create as ipfsHttpClient} from "ipfs-http-client";
import Web3Modal from "web3modal";
import { ethers } from 'ethers'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import{ARKHAMM_CLOUD_ABI, ARKHAMM_CLOUD_ADDRESS} from "/constants"

function Dashboard(){

  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ name: '', type: '' })
  const router = useRouter();

  const [docts, setDocts] = useState([])
  const [ftc, setFtc] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadDocts()
  }, [])

  async function loadDocts() {
    const web3Modal = new Web3Modal({
      network: "matic",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const retrieveContract = new ethers.Contract(ARKHAMM_CLOUD_ADDRESS, ARKHAMM_CLOUD_ABI, signer)
    const fetchContract = new ethers.Contract(ARKHAMM_CLOUD_ADDRESS, ARKHAMM_CLOUD_ABI, signer)
    const data = await retrieveContract.getMyArk()

    const items = await Promise.all(data.map(async i => {
      let item = {
        name: i.name,
        type: i.type,
        url: i.url
      }
      return item
    }))
    const docItems = items.filter(i => i.sold)
    setFtc(docItems)
    setDocts(items)
    setLoadingState('loaded')
  }

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

  async function addArk() {
    const { name, type } = formInput
    if (!name || !type || !fileUrl) return
    const data = JSON.stringify({
      type, name, doc: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      addFile(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function addFile(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(ARKHAMM_CLOUD_ADDRESS, ARKHAMM_CLOUD_ABI, signer)
    let transaction = await contract.addMyArk(url, formInput.type, formInput.name)
    await transaction.wait()
    router.push('/cloud/Dashboard')
  }

  const connectWallet = async() =>{
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(err){
      console.log(err);
    }
  }

  const getProviderOrSigner = async(needSigner = false) => {

    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const {chainId} = await web3Provider.getNetwork();
    if(chainId!==137){
      window.alert("Change the network to Polygon Main Network");
      throw new Error("Change network to Polygon Main Network");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() =>{
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      })
      connectWallet();
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={addArk}
          className="w-72 h-16 text-black bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 shadow-glow p-4"
        >
          Upload
        </button>
      );
    }
  }


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
      <div className="flex object-contain justify-center inset-0 w-full p-36 bg-[url('/Clouds.jpg')]">

          <div className="rounded-lg lg:w-1/2">
               <h1 className="text-3xl text-white font-extrabold sm:text-5xl text-center">
                  Upload your file here
                </h1>
              <div className="m-4">
                  <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32">
                          <div className="flex flex-col items-center justify-center pt-7">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white group-hover:text-white-600" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                              </svg>
                          </div>

                          <input type="file" className="opacity-0" onChange={onChange} type="file" />
                      </label>

                  </div>
              </div>
              <input
                placeholder="File Name"
                className="mt-8 border rounded p-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}

              />
              <input
                placeholder="File Type"
                className="mt-8 border rounded p-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={e => updateFormInput({ ...formInput, type: e.target.value })}

              />
              <br />
              <div className="flex p-2 space-x-4">
                  <button className="block w-full absolute left-1/2 transform -translate-x-1/2 sm:w-auto">{renderButton()}</button>
              </div>
          </div>
      </div>
      <hr />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-white dark:text-white">
      <thead className="text-xs text-white uppercase border-b">
      <tr>
      <th scope="col" className="px-6 py-6">
      File Name
      </th>
      <th scope="col" className="px-6 py-3">
      File Type
      </th>
      <th scope="col" className="px-6 py-3">
      Quant-Chain Hash
      </th>
      </tr>
      </thead>
      <tbody>
      {
      docts.map((doct, i) => (
      <tr key={i}>
      <th scope="row" className="px-6 py-4 font-medium text-white dark:text-white whitespace-nowrap"></th>
        <td className="px-6 py-4">
        {doct.name}
        </td>
        <td className="px-6 py-4">
        {doct.type}
        </td>
        <td className="px-6 py-4">
        {doct.url}
        </td>
        <td className="px-6 py-4 text-right">
        <button className="w-36 h-10 text-black bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 shadow-glow p-4">Download</button>
        </td>
        <td className="px-6 py-4 text-right">
        <button className="w-36 h-10 text-black bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 shadow-glow p-4">Share</button>
        </td>
        </tr>
        ))
      }


      </tbody>
      </table>
      </div>
      <div>
      </div>
      <hr />
      <CybornFooter />
    </div>
  )
}

export default Dashboard;
