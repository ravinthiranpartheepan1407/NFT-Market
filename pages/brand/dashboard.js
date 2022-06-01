import { ethers } from 'ethers'
import { useEffect, useState } from "react"
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Image from 'next/image'
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from "next/head";


import { ARKHAMM_BRANDTKN_ADDRESS, ARKHAMM_BRAND_ADDRESS, ARKHAMM_BRAND_ABI, ARKHAMM_BRANDTKN_ABI} from '/constants'

export default function Dashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "matic",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(ARKHAMM_BRAND_ADDRESS, ARKHAMM_BRAND_ABI, signer)
    const tokenContract = new ethers.Contract(ARKHAMM_BRANDTKN_ADDRESS, ARKHAMM_BRANDTKN_ABI, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (<div className="bg-background "><Head>
    <title>Arkhamm Web3</title>
    <meta name="description" content="Arkhamm Blockchain" />
    <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
  </Head><CybornHeader /><br /><br /><br /><br /><p className="text-white text-center text-6xl">No NFTs Created By You</p><br /><br /><br /><br /><CybornFooter /></div>)
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
      <div className="p-4 bg-background">
        <h2 className="text-6xl text-white py-2">Verified Inventory</h2>
        <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:p-16 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className=" overflow-hidden w-full">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-cybornheader">
                <p style={{ height: '40px' }} className="text-sm text-white font-semibold">Owner: {nft.seller}</p>
                <p className="text-sm text-white">Brand/Product Name:{nft.name}</p>
                <p className="text-sm text-white">Brand/Product URL: <Link href={nft.description}>{nft.description}</Link></p>
                <p className="text-sm text-white">Hash: <Link href={nft.image}>{nft.image}</Link></p>
                <p className="text-sm text-white">Token Id: {nft.tokenId}</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500">
                  <p className="text-xl font-medium text-center text-black">Verified: Yes</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
        <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft, i) => (
                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                      <img src={nft.image} className="rounded" />
                      <div className="p-4 bg-black">
                        <p style={{ height: '40px' }} className="text-sm text-white font-semibold">Seller: {nft.seller}</p>
                        <br />
                        <p style={{ height: '40px' }} className="text-sm text-white font-semibold">Seller: {nft.seller}</p>
                        <br />
                        <p style={{ height: '40px' }} className="text-sm text-white font-light">Owner: {nft.owner}</p>
                        <br />
                        <p style={{ height: '40px' }} className="text-white font-light">Sold: {nft.sold}</p>
                      </div>
                      <div className="p-4 bg-black">
                        <p className="text-2xl font-light text-white">Price - {nft.price} Matic</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
        <br />
        <br />
        <CybornFooter />
    </div>
  )
}
