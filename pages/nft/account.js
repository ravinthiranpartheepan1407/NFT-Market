import { ethers } from 'ethers'
import { useEffect, useState } from "react"
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Image from 'next/image'
import MarketHeader from "/components/MarketHeader"
import CybornFooter from "/components/CybornFooter"

import { ARKHAMM_NFT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ABI, ARKHAMM_NFT_ABI} from '/constants'



export default function account() {
  const [nfts, setNfts] = useState([])
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
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (<div className="bg-background "><MarketHeader /><br /><br /><br /><br /><p className="text-white text-center text-6xl">No NFTs Owned By You</p><br /><br /><br /><br /><CybornFooter /></div>)
  return (
    <div>
    <MarketHeader />
    <div className="flex justify-center bg-background">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white bg-gradient-to-l from-indigo-500 to-bg-purple-400">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    <CybornFooter />
    </div>
  )
}
