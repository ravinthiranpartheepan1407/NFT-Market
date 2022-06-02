import { ethers } from 'ethers'
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import CybornHeader from "/components/CybornHeader";
import CybornFooter from "/components/CybornFooter";
import {useRouter} from "next/router";
import Head from "next/head";
import {ARKHAMM_INSURANCE_ABI, ARKHAMM_INSURANCE_ADDRESS} from "/constants";

function Dashboard(){
  const router = useRouter();
  const[walletConnected, setWalletConnected] = useState("false");
  const web3ModalRef = useRef();



  const buyInsurance = async()=> {
    try{
      const signer = await getProviderOrSigner(true);
      const arkhammInsurance = new Contract(
        ARKHAMM_INSURANCE_ADDRESS,
        ARKHAMM_INSURANCE_ABI,
        signer
      );
    } catch(err){
      console.error(err);
    }
  }




  const claimInsurance = async()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const arkhammInsurance = new Contract(
        ARKHAMM_INSURANCE_ADDRESS,
        ARKHAMM_INSURANCE_ABI,
        signer
      );
    } catch(err){
      console.error(err);
    }
  }




  const reimburseClaim = async()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const arkhammInsurance = new Contract(
        ARKHAMM_INSURANCE_ADDRESS,
        ARKHAMM_INSURANCE_ABI,
        signer
      );
    } catch(err){
      console.error(err);
    }
  }



  const connectWallet = async()=>{
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(err){
      console.log(err);
    }
  }

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 137) {
      window.alert("Change the network to Polygon Main Network");
      throw new Error("Change network to Polygon Main Network");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

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

      <CybornFooter />
    </div>
  )
}

export default Dashboard;
