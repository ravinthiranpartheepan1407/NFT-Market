import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/Home.module.css'
import{ BigNumber, Contract, providers, utils } from "ethers";
import React,{ useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import{ ARKHAMM_CONTRACT_ABI, ARKHAMM_CONTRACT_ADDRESS, ARKHAMM_ICO_ABI, ARKHAMM_ICO_ADDRESS } from "/constants";
import { useRouter } from 'next/router';
export default function Home() {

  const router = useRouter();

  const zero = BigNumber.from(0);
  const[walletConnected, setWalletConnected] = useState(false);
  const[loading, setLoading] = useState(false);
  const[tokenToBeClaimed, setTokenToBeClaimed] = useState(zero);
  const[balanceOfArkhammTokens, setbalanceOfArkhammTokens] = useState(zero);
  const[tokenAmount, setTokenAmount] = useState(zero);
  const[tokenMinted, setTokenMinted] = useState(zero);
  const web3Refs = useRef();

  const getTokensToBeClaimed = async()=>{
    try{
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(ARKHAMM_CONTRACT_ADDRESS, ARKHAMM_CONTRACT_ABI, provider);
      const tokenContract = new Contract(ARKHAMM_ICO_ADDRESS, ARKHAMM_ICO_ABI, provider);
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      const balance = await nftContract.balanceOf(address);
      if(balance === zero){
        setTokenToBeClaimed(zero);
      } else{
        var amount = 0;
        for(var i=0; i<balance; i++){
          const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
          const claimed = await nftContract.tokenIdsClaimed(tokenId);
          if(!claimed){
            amount++;
          }
        }
        setTokenToBeClaimed(BigNumber.from(amount));
      }
    } catch(err){
      console.log(err);
      setTokenToBeClaimed(zero);
    }
  };

    const getbalanceOfArkhammTokens = async()=>{
      try{
        const provider = await getProviderOrSigner();
        const tokenContract = new Contract(ARKHAMM_ICO_ADDRESS, ARKHAMM_ICO_ABI, provider);
        const signer = await getProviderOrSigner(true);
        const address = await signer.getAddress();
        const balance = await tokenContract.balanceOf(address);
        setbalanceOfArkhammTokens(balance);
      } catch(err){
        console.log(err);
        setbalanceOfArkhammTokens(zero);
      }
    };

    const mintArkhammTokens = async(amount)=>{
      try{
        const signer = await getProviderOrSigner(true);
        const tokenContract = new Contract(ARKHAMM_ICO_ADDRESS, ARKHAMM_ICO_ABI, signer);
        const value = 0.01 * amount;
        const tx = await tokenContract.mint(amount,{
          value: utils.parseEther(value.toString()),
        });
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.alert("successfully Minted Arkhamm Tokens");
        await getbalanceOfArkhammTokens();
        await getTotalTokensMinted();
        await getTokensToBeClaimed();
      } catch(err){
        console.log(err);
      }
    };

    const claimArkhammTokens = async()=>{
      try{
        const signer = await getProviderOrSigner(true);
        const tokenContract = new Contract(ARKHAMM_ICO_ADDRESS, ARKHAMM_ICO_ABI, signer);
        const tx = await tokenContract.claim();
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.alert("successfully Minted Arkhamm Tokens");
        await getbalanceOfArkhammTokens();
        await getTotalTokensMinted();
        await getTokensToBeClaimed();
      } catch(err){
        console.log(err);
      }
    };

    const getTotalTokensMinted = async()=>{
      try{
        const provider = await getProviderOrSigner();
        const tokenContract = new Contract(ARKHAMM_ICO_ADDRESS, ARKHAMM_ICO_ABI, provider);
        const _tokenMinted = await tokenContract.totalSupply();
        setTokenMinted(_tokenMinted);
      } catch(err){
        console.log(err);
      }
    };

    const getProviderOrSigner = async(needSigner = false) =>{
      const provider = await web3Refs.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const {chainId} = await web3Provider.getNetwork();
      if(chainId !== 137){
        window.alert("Change Network To Polygon Main Network");
        throw new Error("Change Network To Polygon Main Network");
      }
      if(needSigner){
        const signer = web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    };

    const connectWallet = async()=>{
      try{
        await getProviderOrSigner();
        setWalletConnected(true);
      } catch(err){
        console.log(err);
      }
    };

    useEffect(()=>{
      if(!walletConnected){
        web3Refs.current = new Web3Modal({
          network: "matic",
          providerOptions: {},
          disabledInjectedProvider: false,
        });
        connectWallet();
        getTotalTokensMinted();
        getbalanceOfArkhammTokens();
        getTokensToBeClaimed();
      }
    }, [walletConnected]);

    const renderButton = ()=>{
      if(loading){
        return(
          <div>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"> Loading... </button>
          </div>
        );
      }

      if(getTokensToBeClaimed > 0){
        return(
          <div>
            <div className="text-white">
              {tokenToBeClaimed * 10} Tokens To Be Claimed
            </div>
            <button className="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" onClick={claimArkhammTokens}>Claim Tokens</button>
          </div>
        );
      }

      return(
        <div className="mr-50 grid grid-cols-2 grid-gap-4 text-center">
          <input className="block text-white p-6 px-12 max-w-sm bg-white rounded-lg shadow-md hover:bg-background dark:bg-black dark:hover:bg-background" placeholder="Enter Token Qty" type="number" onChange={(e)=> setTokenAmount(BigNumber.from(e.target.value))} />

          <button className="block w-full py-5 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" disabled={!(tokenAmount > 0)} onClick={()=>mintArkhammTokens(tokenAmount)}> Mint Tokens </button>
        </div>
      );
    };
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
    <section className="relative bg-background">
      <img
        className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
        src="/ICO.jpg"
      />

  <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

  <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
    <div className="max-w-xl text-center sm:text-left">
      <h1 className="ml-8 text-3xl text-white font-extrabold sm:text-5xl">
        <span className="text-3xl text-white font-extrabold sm:text-5xl"> Get Our AKM Tokens </span>
        <strong className="font-extrabold text-white sm:block">
          Want to mint our tokens?
        </strong>
      </h1>

      <p className="ml-8 max-w-lg mt-4 text-white sm:leading-relaxed sm:text-xl">
        Mint Our Tokens and Gain access to our Web3 Resources
      </p>
      <br />

      <div>
      {walletConnected ? (
        <div className="p-8 text-center">
          {renderButton()}
        </div>
        ):(
            <div className="flex">

            <button className="block w-full py-4 ml-8 px-4 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" onClick={connectWallet}> Connect Your Wallet </button>

            </div>
          )}
      </div>

      </div>

  </div>
</section>
<CybornFooter />
</div>
  )
}
