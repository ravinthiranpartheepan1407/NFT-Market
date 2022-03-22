import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Web3Modal from "web3modal";
import Head from "next/head";
import moment from "moment";
import { TelegramShareButton, TelegramIcon } from "next-share";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { tokenIdsMinted } from "../launchmint/whitelist.js";
import { ethers } from "ethers";
import { IoCopyOutline } from "react-icons/io5";
import { FaTelegramPlane, FaTwitter } from "react-icons/fa";
import CybornHeader from "/components/CybornHeader";
import CybornSubscribe from "/components/CybornFooter";

function Success() {
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

    const copy = React.useCallback(() => {
      if (!copied) setCopied(copyToClipboard(text));
    }, [text]);
    React.useEffect(() => () => setCopied(false), [text]);

    return [copied, copy];
  };

  const TextCopy = (props) => {
    const [copied, copy] = useCopyToClipboard("https://Arkhamm.com");
    return (
      <div>
        <button
          onClick={copy}
          className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 p-4 flex items-center shadow-glow "
        >
          <IoCopyOutline className="mr-2" />
          <span>Arkhamm.com</span>
        </button>
        <div className="text-secondary-300 h-2 mt-1">
          {copied && "💡 Link Copied! "}
        </div>
      </div>
    );
  };

  const useCopyToClipboards = (text) => {
    const copyToClipboards = (str) => {
      const els = document.createElement("textarea");
      els.value = str;
      els.setAttribute("readonly", "");
      document.body.appendChild(els);
      const selecteds =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      els.select();
      const successs = document.execCommand("copy");
      document.body.removeChild(el);
      if (selecteds) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return successs;
    };

    const [copieds, setCopieds] = React.useState(false);
    const [disables, setDisables] = useState(false);

    const copys = React.useCallback(() => {
      if (!copieds) setCopieds(copyToClipboard(text));
    }, [text]);
    React.useEffect(() => () => setCopieds(false), [text]);

    return [copieds, copys];
  };

  const TextCopys = (props) => {
    const [copieds, copys] = useCopyToClipboard(
      "0x822670eD5157ECCd5b32324ecd5FE351619636c0"
    );
    return (
      <>
        <div className="mt-6 w-fit border-primary-500 px-3 py-4 transition-all text-secondary-300 hover:text-primary-500">
          <button onClick={copys} className="flex items-center">
            <>
              <IoCopyOutline className="mr-2 h-6 w-6" />
              Copy and paste this address to your wallet to display your NFT{" "}
            </>
          </button>
        </div>
        <div className="text-secondary-300">
          {copieds && "💡 Address Copied! "}
        </div>
      </>
    );
  };

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

  async function disconnect() {
    const web3Modal = new Web3Modal({
      network: "matic", // optional
      cacheProvider: true, // optional
      providerOptions: {},
    });
    const clear = await web3Modal.clearCachedProvider();
  }

  const vidRef=useRef();

  return (
    <>
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
      <div className="bg-background min-h-screen h-full w-screen font-Ubuntu antialiased">
      <CybornHeader />
        <div className="min-h-screen h-full w-full md:flex">
          <div className="p-2 flex-1 md:pt-10 md:pl-12">
            <p className="text-6xl font-medium text-center text-lime-100 md:text-left md:text-7xl">
              Congratulations! 🎉
            </p>
            <p className="text-2xl pt-10 text-center font-bold text-white md:text-left md:text-6xl">
              You are now a Arkhamm Member
            </p>
            <TextCopys />
            <p className="pt-5 text-secondary-300">
              Share this piece of art with your frens 💚
            </p>
            <br />
            <div className="items-center">
              <TextCopy />
              <div className="text-secondary-300"> or </div>
              <div className="flex flex-row mt-2">
              <div className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 transition-all hover:bg-blue-500 h-14 w-14 group mr-2">
                <div className="">
                  <TelegramShareButton
                    url={
                      "https://opensea.io/collection/arkhamm-tokens"
                    }
                    title={"I just became a @Arkhamm DAO Member 💚"}
                  >
                    <FaTelegramPlane className="w-6 h-6 text-white m-4 group-hover:text-black"></FaTelegramPlane>
                    <p className=" text-xs pt-1 text-background group-hover:text-secondary-300">
                      Telegram
                    </p>
                  </TelegramShareButton>
                </div>
              </div>
              <div className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 transition-all hover:bg-blue-500 h-14 w-14 group ">
                <div className="">
                  <TwitterShareButton
                    url={
                      "https://opensea.io/collection/arkhamm-tokens"
                    }
                    title={"I just became a Arkhamm DAO Member 💚"}
                  >
                    <FaTwitter className="w-6 h-6 m-4 text-white group-hover:text-black"></FaTwitter>
                    <p className=" text-xs pt-1 text-background group-hover:text-secondary-300">
                      Twitter
                    </p>
                  </TwitterShareButton>
                </div>
              </div>
              </div>
            </div>

            <p className="text-5xl pt-5 text-primary-500 md:text-6xl">
              {timeLeft}
              <span className="text-secondary-300"> hrs left</span>
            </p>
            <div className="pt-5 hidden sm:flex">
              <Link
                passHref
                href="https://opensea.io/collection/arkhamm-tokens"
              >
                <div className=" transition-all">
                  <img
                    alt="Opensea logo"
                    className="w-20 h-20 cursor-pointer"
                    src="/opensea.png"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex-1 shrink-0 ">
            <div className="flex-1 shrink-0 w-full object-cover md:h-full">
              <video className="w-full h-full object-cover" src="/DAO.mp4" autoPlay muted loop playsInline ref={ vidRef }/>
            </div>
            <div className="flex sm:hidden">
              <Link
                passHref
                href="https://opensea.io/collection/arkhamm-tokens"
              >
                <div className="flex text-white items-center bg-opensea w-full">
                  <img
                    alt="Opensea logo"
                    className="w-20 h-20 cursor-pointer"
                    src="/opensea.png"
                  />
                  <p>See it in Opensea</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <CybornSubscribe />
      </div>
    </>
  );
}

export default Success;
