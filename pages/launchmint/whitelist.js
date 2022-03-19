import Head from 'next/head'
import Image from 'next/image'
import styles from "/styles/Home.module.css";
import web3Modal from "web3modal";
import {providers, Contract} from "ethers";
import {useEffect, useRef, useState} from "react";
import {WHITELISTED_CONTRACT, abi} from "/constants";
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';


export default function Home() {

  const[walletConnected, setWalletConnected] = useState(false);
  const[joinedWhiteList, setJoinedWhiteList] = useState(false);
  const[loading, setLoading] = useState(false);
  const[numberOfWhiteListed, setNumberOfWhiteListed] = useState(0);
  const web3ModalRef = useRef();

  const vidRef=useRef();

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
        value: utils.parseEther("0.5"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Arkhamm NFT");
    } catch (err) {
      console.error(err);
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
        value: utils.parseEther("0.5"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.location.href = "/Success";
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
      const _presaleStarted = await nftContract.presaleKlvrsStarted();
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
      const _presaleEnded = await nftContract.presaleKlvrsEnded();
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

  const notify = (message) => toast(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,

    });


//Connect Wallet function


  const getProviderOrSigner = async(needSigner = false) =>{
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const {chainId} = await web3Provider.getNetwork();
    if(chainId !== 80001){
      window.alert("Change Network To Matic Test Net");
      throw new Error("Change Network to Matic Test Net");
    }

    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


//Add Current Wallet to whitelist array

const addAddressToWhiteLists = async() =>{
  try{
    const signer = await getProviderOrSigner(true);
    const whitelistContract = new Contract(
      WHITELISTED_CONTRACT, abi, signer
    );

    const tx = await whitelistContract.addAddressToWhitelist();
    setLoading(true);
    await tx.wait();
    setLoading(false);
      window.location.href= "/launchmint/mint"
    await getNumberOfWhiteListed();
    setJoinedWhiteList(true);

  } catch(err){
    console.log(err);
    if(err?.message) {
      notify(err.message)
    }

    if(err?.data?.message){
      notify(err.data.message)
    }
  }
};

 const getNumberOfWhiteListed = async() =>{
   try{
     const provider = await getProviderOrSigner();
     const whitelistContract = new Contract(WHITELISTED_CONTRACT, abi, provider);
     const _numberOfWhiteListed = await whitelistContract.numAddressWhiteListed();
     setNumberOfWhiteListed(_numberOfWhiteListed);
   } catch(err){
     console.log(err);
   }
 };

 const checkIfAddressInWhiteList = async() =>{
   try{
     const signer = await getProviderOrSigner(true);
     const whitelistContract = new Contract(WHITELISTED_CONTRACT, abi, signer);
     const address = await signer.getAddress();
     const _joinedWhiteListAddress = await whitelistContract.whiteListedAddresses(address);
     setJoinedWhiteList(_joinedWhiteListAddress);
   } catch(err){
     console.log(err);
   }
 };

 const connectWallet = async() =>{
   try{
     await getProviderOrSigner();
     setWalletConnected(true);

     checkIfAddressInWhiteList();
     getNumberOfWhiteListed();
   } catch(err){
     console.log(err);
   }
 };

 const renderButton = () =>{
   if(walletConnected){
     if(joinedWhiteList){
       return(
         <div>
         </div>
       );
     } else if(loading){
       return(<div><button className="flex items-center shadow-glow py-2 px-10">Loading...</button></div>);
     } else{
       return(<div><button className="flex items-center text-xl py-2 px-10" onClick={addAddressToWhiteLists}>Join Waitlist</button></div>);
     }
   } else{
     return(<div><button className="flex items-center py-2 px-10" onClick={connectWallet}>Connect Your Wallet</button></div>);
   }
 };

 useEffect(()=>{
   if(!walletConnected){
     web3ModalRef.current = new web3Modal({
       network: "mumbai",
       providerOptions: {},
       disableInjectedProvider: false,
     });
     connectWallet();
   }
 }, [walletConnected]);

  return (
    <div className=" h-full w-screen antialiased">
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
       <ToastContainer position="top-left"  autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
      <div className="flex bg-background h-full justify-center items-center flex-col md:flex-row">
        <div className="p-10 flex-1 md:p-20">
          <p className="text-xl text-white font-medium text-center text-primary-700 md:text-left">Arkhamm</p>
          <p className="text-6xl text-white text-center font-bold text-white md:text-left">CLAIM YOUR ARKHAMM <br /> ONBAORD NFT</p>
          <p className="text-secondary-300 text-white text-center pb-10 pt-3 md:text-left">Join the biggest DAO platform for Web3 Job Seekers</p>
          <br />
          <div className="flex flex-col items-center md:items-start">
           <div className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">{renderButton()}</div>
          </div>
        </div>
        <div className="flex-1 shrink-0">
          <div className="flex-1 shrink-0 w-full object-cover md:h-screen">
            <video className="w-full h-screen object-cover" src="/DAO.mp4" autoPlay muted loop playsInline ref={ vidRef }/>
        </div>
      </div>
      </div>
    </div>
  );
}
