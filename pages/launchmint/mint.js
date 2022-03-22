import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { ARKHAMM_CONTRACT_ABI, ARKHAMM_CONTRACT_ADDRESS } from "/constants";
import styles from "/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { BiWalletAlt } from "react-icons/bi";
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import CybornHeader from "/components/CybornHeader";
import CybornSubscribe from "/components/CybornFooter";


export default function Home() {
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

  return (
    <div className="h-screen font-Ubuntu w-screen antialiased">
    <CybornHeader />
          <ToastContainer position="top-left"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
      <Head>
        <title>Arkhamm Web3</title>
        <meta name="description" content="Arkhamm Blockchain" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
      </Head>
      <div className="bg-background flex h-full flex-col md:flex-row">
        <div className="p-10 flex-1 flex flex-col justify-center md:p-20">
          <p className="text-xl  font-bold text-center text-primary-700 md:text-left">
            ARKHAMM
          </p>
          <p className="text-5xl leading-tight pt-2 text-center font-extrabold text-white md:text-7xl md:text-left">
            CLAIM YOUR ARKHAMM <br />ONBOARD NFT
          </p>
          <p className="text-secondary-300 text-center pb-10 pt-3 md:text-left">
            Join the biggest DAO based web3 job seeking platform
          </p>
          <br />
          <div className="flex flex-col items-center md:items-start">
            <div className="pb-12">{renderButton()}</div>
            <p id="token">
              <span className="text-primary-500 text-3xl">
                {10000000 - tokenIdsMinted} / 10000000 &nbsp;
              </span>
              <span className="text-secondary-300 text-2xl">
                left to claim.
              </span>
            </p>
            <p className="text-6xl pt-3 text-primary-500">
              {timeLeft}
              <span className="text-secondary-300"> hrs left</span>
            </p>
          </div>
        </div>
        <div className="flex-1 shrink-0">
          <div className="flex-1 shrink-0 h-full w-full object-cover md:h-full">
            <video className="w-full h-full object-cover" src="/DAO.mp4" autoPlay muted loop playsInline ref={ vidRef }/>
        </div>
      </div>
      </div>
      <CybornSubscribe />
    </div>
  );
}
