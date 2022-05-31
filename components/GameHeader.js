import React from "react";

import web3Modal from "web3modal";
import {useEffect, useRef, useState} from "react";
import { BiWalletAlt } from "react-icons/bi";
import Web3Modal from "web3modal";
import {useRouter} from "next/router";
import { Contract, providers, utils } from "ethers";
import Head from "next/head";

import { ARKHAMM_GAME_ABI, ARKHAMM_GAME_ADDRESS } from "/constants";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


function GameHeader(){
    const [active, setActive] = useState(false);
    const router = useRouter();
    const [presaleStarted, setPresaleStarted] = useState(false);
    const [presaleEnded, setPresaleEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [tokenIdsMinted, setTokenIdsMinted] = useState("0");


    const handleClick = () => {
      setActive(!active);
    };

  const[walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const web3ModalRef = useRef();

  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        signer
      );
      const tx = await whitelistContract.presaleMint({
        value: utils.parseEther("0.1"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Arkhamm NFT");
      window.location.href = "/launchmint/Success";
    } catch (err) {
      console.error(err);
      if(err?.data?.message){
        notify(err.data.message)
      }
    }
  };

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        signer
      );
      const tx = await whitelistContract.mint({
        value: utils.parseEther("0.1"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.location.href = "/launchmint/Success";
    } catch (err) {
      console.log(err.data.message)
      if(err?.data?.message){
        notify(err.data.message)
      }
    }
  };

  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        signer
      );
      const tx = await whitelistContract.startPresale();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await checkIfPresaleStarted();
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfPresaleStarted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        provider
      );
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const checkIfPresaleEnded = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        provider
      );
      const _presaleEnded = await nftContract.presaleEnded();
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        provider
      );
      const _owner = await nftContract.owner();
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        ARKHAMM_CONTRACT_ADDRESS,
        ARKHAMM_CONTRACT_ABI,
        provider
      );
      const _tokenIds = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async(needSigner = false) =>{
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const addr = await signer.getAddress();
    setUserAddress(addr.toString());

    const {chainId} = await web3Provider.getNetwork();
    if(chainId !== 137){
      window.alert("Change Network To Polygon Main Network");
      throw new Error("Change Network to Polygon Main Network");
    }

    if(needSigner){
      const signer = web3Provider.getSigner();
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async() =>{
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();

      const _presaleStarted = checkIfPresaleStarted();
      if (_presaleStarted) {
        checkIfPresaleEnded();
      }

      getTokenIdsMinted();

      const presaleEndedInterval = setInterval(async function () {
        const _presaleStarted = await checkIfPresaleStarted();
        if (_presaleStarted) {
          const _presaleEnded = await checkIfPresaleEnded();
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval);
          }
        }
      }, 5 * 1000);

      setInterval(async function () {
        await getTokenIdsMinted();
      }, 5 * 1000);
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button
          onClick={connectWallet}
          className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4"
        >
          <BiWalletAlt className="mr-2" />
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return (
        <button className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10">
          Minting...
        </button>
      );
    }

    if (isOwner && !presaleStarted) {
      return (
        <button
          className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10"
          onClick={startPresale}
        >
          Start Arkhamm NFT Minting
        </button>
      );
    }

    if (!presaleStarted) {
      return (
        <div>
          <div></div>
        </div>
      );
    }

    if (presaleStarted && !presaleEnded) {
      return (
        <div>
          <button
            className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10 "
            onClick={presaleMint}
          >
            Mint Arkhamm Onboard NFT
          </button>
          <p className="text-secondary-300 text-xs pt-1 max-w-[270px]">
            Make sure you have enough Matic to pay for the gas. You can mint only once.
          </p>
        </div>
      );
    }

    if (presaleStarted && presaleEnded) {
      return (
        <>
          <button
            className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10"
            onClick={publicMint}
          >
            <span className="Mint-NFT-">Mint your NFT</span>🚀
          </button>
          <p className="text-secondary-300 text-xs pt-1 max-w-[200px]">
          Make sure you have enough Matic to pay for the gas. You can mint only once.
          </p>
        </>
      );
    }
  };

  return(
    <nav className='flex items-center flex-wrap'>

         <button type="button" onClick={renderButton()} className="text-gray-900 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium text-sm px-2 py-2 mt-0 text-center w-full items-center">
            &nbsp; Mint NFT
         </button>

     </nav>
  )
}

export default GameHeader;
