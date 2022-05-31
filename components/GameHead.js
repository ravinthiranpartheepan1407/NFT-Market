import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { ARKHAMM_GAME_ABI, ARKHAMM_GAME_ADDRESS } from "/constants";
import styles from "/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { BiWalletAlt } from "react-icons/bi";
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';



export default function GameHead() {

  const [color, setColor] = useState("#20272c");
  const [textColor, setTextColor] = useState("#cacccf");
  const notify = (message) => toast(message, {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });


  const useCopyToClipboard = (text) => {
    const copyToClipboard = (str) => {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      const success = document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return success;
    };

    const [copied, setCopied] = React.useState(false);
    const [disable, setDisable] = useState(false);



    const copy = React.useCallback(() => {
      if (!copied) setCopied(copyToClipboard(text));
    }, [text]);
    React.useEffect(() => () => setCopied(false), [text]);

    return [copied, copy];
  };

  const TextCopy = (props) => {
    const [copied, copy] = useCopyToClipboard(
      "0xF7BA4DB84f1738241Be5870e0adA9082C5CDF907"
    );
    return (
      <div id="mobileCopy">
        <button disabled={true} className="address">
          <img className="IconOutlineduplicate" src="./duplicate@3x.png" />
          <span className="Copy-address">Copy Address</span>{" "}
        </button>
        <div className="-Copy-and-paste-this-address-to-your-wallet-to-display-your-NFT">
          {copied &&
            "💡 Copy and paste this address to your wallet to display your NFT "}
        </div>
      </div>
    );
  };

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const web3ModalRef = useRef();
  const vidRef=useRef();

  const route = useRouter();

  const calculateTimeLeft = () => {
    let eventTime = 1325920000000000;
    let currentTime = Math.floor(Date.now() / 1000).toString();
    let leftTime = eventTime - currentTime;
    let duration = moment.duration(leftTime, "seconds");
    let interval = 1000;
    if (duration.asSeconds() <= 0) {
      clearInterval(interval);
    }
    duration = moment.duration(duration.asSeconds() - 1, "seconds");
    let hours = duration.hours() < 10 ? `0${duration.hours()}` : duration.hours();
    let minutes = duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
    let seconds = duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();
    return (
      `${hours}:${minutes}:${seconds}`
    );
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
        signer
      );
      const tx = await whitelistContract.presaleMint({
        value: utils.parseEther("0.1"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Arkhamm Game NFT Tag");
      window.location.href = "/game/Success";
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
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
        signer
      );
      const tx = await whitelistContract.mint({
        value: utils.parseEther("0.1"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.location.href = "/game/Success";
    } catch (err) {
      console.log(err.data.message)
      if(err?.data?.message){
        notify(err.data.message)
      }
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
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
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
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
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
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
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
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
        ARKHAMM_GAME_ADDRESS,
        ARKHAMM_GAME_ABI,
        provider
      );
      const _tokenIds = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

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
          className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium  text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4"
        >
          <BiWalletAlt className="mr-2" />
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return (
        <button className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium  text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10">
          Minting...
        </button>
      );
    }

    if (isOwner && !presaleStarted) {
      return (
        <button
          className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium  text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10"
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
            className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium  text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10 "
            onClick={presaleMint}
          >
            Mint Arkhamm Game NFT Tag
          </button>

        </div>
      );
    }

    if (presaleStarted && presaleEnded) {
      return (
        <>
          <button
            className="w-84 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium  text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow py-4 px-10"
            onClick={publicMint}
          >
            <span className="Mint-NFT-">Mint Arkhamm Game NFT Tag</span>🚀
          </button>

        </>
      );
    }
  };


  return(
    <nav className='flex items-center flex-wrap bg-cybornheader '>
       <Link href='/'>
         <a className='inline-flex items-center p-1 mr-4 '>
          <img src="/ark.png" width={100} height={100} className="rounded" />
         </a>
       </Link>
       <button
         className=' inline-flex p-3 hover:bg-background rounded lg:hidden text-white ml-auto hover:text-white outline-none'
         onClick={handleClick}
       >
         <svg
           className='w-6 h-6'
           fill='none'
           stroke='currentColor'
           viewBox='0 0 24 24'
           xmlns='http://www.w3.org/2000/svg'
         >
           <path
             strokeLinecap='round'
             strokeLinejoin='round'
             strokeWidth={2}
             d='M4 6h16M4 12h16M4 18h16'
           />
         </svg>
       </button>
       <div
         className={`${
           active ? '' : 'hidden'
         }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
       >
        <div className="lg:text-base lg:inline-flex md:space-x-0 md:mt-0 md:text-sm lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
           <Link href="/nft/market">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white ">
               NFT Market
             </a>
           </Link>
           <Link href="/token/home">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               Arkhamm Tokens
             </a>
           </Link>
           <Link href="/defi/home">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               DEX
             </a>
           </Link>
           <Link href="/launchmint/whitelist">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               Minting
             </a>
           </Link>
           <Link href="/dao/Home">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               DAO
             </a>
           </Link>
           <Link href="/game/home">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               De-Game
             </a>
           </Link>
           <Link href="/quantum/home">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               Quant-Block-Encryption
             </a>
           </Link>
           <Link href="/blog/home">
             <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-background hover:text-white">
               Updates
             </a>
           </Link>
          </div>
         <div>{renderButton()}</div>
       </div>
     </nav>
  )
}
