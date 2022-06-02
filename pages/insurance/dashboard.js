import { Contract, providers, utils } from "ethers";
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
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

function Dashboard(){
  const router = useRouter();
  const[walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [formInput, updateFormInput] = useState({ price: ''})

  const MySwal = withReactContent(Swal);
  const open = () => {
    MySwal.fire({
      title: 'Successfully Listed Your NFT',
      imageUrl: '{fileUrl}',
      text: 'Share with your audience',
      background:'#04111d',
      icon: 'success',
    });
  };


  const buyInsurance = async()=> {
    const { price } = formInput
    try{
      const signer = await getProviderOrSigner(true);
      const arkhammInsurance = new Contract(
        ARKHAMM_INSURANCE_ADDRESS,
        ARKHAMM_INSURANCE_ABI,
        signer
      );
      const tx = await arkhammInsurance.underwritingProcess({
        value: utils.parseEther(formInput.price, 'ether'),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      open();
      window.location.href = "/insurance/dashboard";
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
        <div>
        <input
          placeholder="Asset Price in Matic"
          className="mt-2 border rounded p-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
          <button onClick={buyInsurance}> Buy Insurance </button>
        </div>
      <CybornFooter />
    </div>
  )
}

export default Dashboard;
