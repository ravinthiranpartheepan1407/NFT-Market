import { ethers } from 'ethers'
import { useEffect, useState } from "react"
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Image from 'next/image'
import MarketHeader from "/components/MarketHeader"
import CybornFooter from "/components/CybornFooter"

import { ARKHAMM_NFT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ABI, ARKHAMM_NFT_ABI} from '/constants'

export default function Inventory() {
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

    const marketContract = new ethers.Contract(ARKHAMM_NFT_MARKET_CONTRACT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ABI, signer)
    const tokenContract = new ethers.Contract(ARKHAMM_NFT_ADDRESS, ARKHAMM_NFT_ABI, provider)
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
      }
      return item
    }))
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (<div className="bg-background "><MarketHeader /><br /><br /><br /><br /><p className="text-white text-center text-6xl">No NFTs Created By You</p><br /><br /><br /><br /><CybornFooter /></div>)
  return (
    <div>
    <MarketHeader />
      <div className="p-4 bg-background">
        <h2 className="text-6xl text-white py-2">Items Created</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500">
                  <p className="text-xl  font-bold text-black">Price - {nft.price} Matic</p>
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
                        <p className="text-2xl font-bold text-white">Price - {nft.price} Matic</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
        <CybornFooter />
    </div>
  )
}
