import { ethers } from 'ethers';
import { useEffect, useState } from "react";
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import { useRouter } from "next/router";
import Image from 'next/image'
import MarketHeader from "/components/MarketHeader"
import CybornFooter from "/components/CybornFooter"

import { ARKHAMM_NFT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ABI, ARKHAMM_NFT_ABI} from '/constants'



export default function Home() {
  const router = useRouter();
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")
    const tokenContract = new ethers.Contract(ARKHAMM_NFT_ADDRESS, ARKHAMM_NFT_ABI, provider)
    const marketContract = new ethers.Contract(ARKHAMM_NFT_MARKET_CONTRACT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ABI, provider)
    const data = await marketContract.fetchMarketItems()


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
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ARKHAMM_NFT_MARKET_CONTRACT_ADDRESS, ARKHAMM_NFT_MARKET_CONTRACT_ABI, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(ARKHAMM_NFT_ADDRESS, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    <div className="bg-background">
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
    <MarketHeader />
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1000px' }}>
        <div id="items" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4 bg-black">
                  <p style={{ height: '40px' }} className="text-2xl text-white font-semibold">{nft.name}</p>
                  <p style={{ height: '40px' }} className="text-white font-light">{nft.description}</p>

                </div>
                <div className="p-4 bg-cybornheader">
                  <p className="mb-4 font-bold text-white">{nft.price} Matic</p>
                  <button className="w-full bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-black font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    <br />
    <CybornFooter />
    </div>
  )
}
