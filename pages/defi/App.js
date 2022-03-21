import { BigNumber, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import styles from "/styles/Home.module.css";
import { addLiquidity, calculateAKI } from "/components/addLiquidity";
import {
  getAKITokensBalance,
  getEtherBalance,
  getLPTokensBalance,
  getReserveOfAKITokens,
} from "/components/getAmounts";
import {
  getTokensAfterRemove,
  removeLiquidity,
} from "/components/removeLiquidity";
import { swapTokens, getAmountOfTokensReceivedFromSwap } from "/components/swap";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [liquidityTab, setLiquidityTab] = useState(true);
  const zero = BigNumber.from(0);
  const [ethBalance, setEtherBalance] = useState(zero);
  const [reservedAKI, setreservedAKI] = useState(zero);
  const [etherBalanceContract, setEtherBalanceContract] = useState(zero);
  const [akiBalance, setakiBalance] = useState(zero);
  const [lpBalance, setLPBalance] = useState(zero);
  const [addEther, setAddEther] = useState(zero);
  const [addAKITokens, setaddAKITokens] = useState(zero);
  const [removeEther, setRemoveEther] = useState(zero);
  const [removeAKI, setremoveAKI] = useState(zero);
  const [removeLPTokens, setRemoveLPTokens] = useState("0");
  const [swapAmount, setSwapAmount] = useState("");
  const [tokenToBeRecievedAfterSwap, setTokenToBeRecievedAfterSwap] = useState(zero);
  const [ethSelected, setEthSelected] = useState(true);
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);


  const getAmounts = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      const _ethBalance = await getEtherBalance(provider, address);
      const _akiBalance = await getAKITokensBalance(provider, address);
      const _lpBalance = await getLPTokensBalance(provider, address);
      const _reservedAKI = await getReserveOfAKITokens(provider);
      const _ethBalanceContract = await getEtherBalance(provider, null, true);
      setEtherBalance(_ethBalance);
      setakiBalance(_akiBalance);
      setLPBalance(_lpBalance);
      setreservedAKI(_reservedAKI);
      setreservedAKI(_reservedAKI);
      setEtherBalanceContract(_ethBalanceContract);
    } catch (err) {
      console.error(err);
    }
  };


  const _swapTokens = async () => {
    try {
      const swapAmountWei = utils.parseEther(swapAmount);
      if (!swapAmountWei.eq(zero)) {
        const signer = await getProviderOrSigner(true);
        setLoading(true);
        await swapTokens(
          signer,
          swapAmountWei,
          tokenToBeRecievedAfterSwap,
          ethSelected
        );
        setLoading(false);
        await getAmounts();
        setSwapAmount("");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSwapAmount("");
    }
  };

  const _getAmountOfTokensReceivedFromSwap = async (_swapAmount) => {
    try {
      const _swapAmountWEI = utils.parseEther(_swapAmount.toString());
      if (!_swapAmountWEI.eq(zero)) {
        const provider = await getProviderOrSigner();
        const _ethBalance = await getEtherBalance(provider, null, true);
        const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
          _swapAmountWEI,
          provider,
          ethSelected,
          _ethBalance,
          reservedAKI
        );
        setTokenToBeRecievedAfterSwap(amountOfTokens);
      } else {
        setTokenToBeRecievedAfterSwap(zero);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const _addLiquidity = async () => {
    try {
      const addEtherWei = utils.parseEther(addEther.toString());
      if (!addAKITokens.eq(zero) && !addEtherWei.eq(zero)) {
        const signer = await getProviderOrSigner(true);
        setLoading(true);
        await addLiquidity(signer, addAKITokens, addEtherWei);
        setLoading(false);
        setaddAKITokens(zero);
        await getAmounts();
      } else {
        setaddAKITokens(zero);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setaddAKITokens(zero);
    }
  };


  const _removeLiquidity = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const removeLPTokensWei = utils.parseEther(removeLPTokens);
      setLoading(true);
      await removeLiquidity(signer, removeLPTokensWei);
      setLoading(false);
      await getAmounts();
      setremoveAKI(zero);
      setRemoveEther(zero);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setremoveAKI(zero);
      setRemoveEther(zero);
    }
  };


  const _getTokensAfterRemove = async (_removeLPTokens) => {
    try {
      const provider = await getProviderOrSigner();
      const removeLPTokenWei = utils.parseEther(_removeLPTokens);
      const _ethBalance = await getEtherBalance(provider, null, true);
      const arkhammTokenReserve = await getReserveOfAKITokens(provider);
      const { _removeEther, _removeAKI } = await getTokensAfterRemove(
        provider,
        removeLPTokenWei,
        _ethBalance,
        arkhammTokenReserve
      );
      setRemoveEther(_removeEther);
      setremoveAKI(_removeAKI);
    } catch (err) {
      console.error(err);
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
      getAmounts();
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4">
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return <button className="lg:ml-12 w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4">Loading...</button>;
    }

    if (liquidityTab) {
      return (
        <div>
          <div className="text-white lg:ml-12">
            <div>
            Your Account Details:
            </div>
            <br />
            <div>
            {utils.formatEther(akiBalance)} Arkhamm Tokens
            </div>
            <br />
            <div>
            {utils.formatEther(ethBalance)} Matic
            </div>
            <br />
            <div>
            {utils.formatEther(lpBalance)} Arkhamm DeFi LP tokens
            </div>
          </div>
          <br />
          <div className="lg:grid grid-cols-1 grid-gap-4 lg:ml-12">
            {utils.parseEther(reservedAKI.toString()).eq(zero) ? (
              <div>
                <input
                  type="number"
                  placeholder="Amount of Matic"
                  onChange={(e) => setAddEther(e.target.value || "0")}
                  className="block text-white p-6 px-12 max-w-sm bg-white rounded-lg shadow-md hover:bg-background dark:bg-cybornheader dark:hover:bg-white hover:text-black"
                />
                <br />
                <input
                  type="number"
                  placeholder="Qty of Arkhamm token"
                  onChange={(e) =>
                    setaddAKITokens(
                      BigNumber.from(utils.parseEther(e.target.value || "0"))
                    )
                  }
                  className="block text-white p-6 px-12 max-w-sm bg-white rounded-lg shadow-md hover:bg-background dark:bg-cybornheader dark:hover:bg-white hover:text-black"
                />
                <br />
                <button className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4" onClick={_addLiquidity}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  placeholder="Amount of Ether"
                  onChange={async (e) => {
                    setAddEther(e.target.value || "0");

                    const _addAKITokens = await calculateAKI(
                      e.target.value || "0",
                      etherBalanceContract,
                      reservedAKI
                    );
                    setaddAKITokens(_addAKITokens);
                  }}
                  className="block text-white p-6 px-12 max-w-sm bg-white rounded-lg shadow-md hover:bg-background dark:bg-cybornheader dark:hover:bg-white hover:text-black"
                />
                <div className="">
                  {`You will need ${utils.formatEther(addAKITokens)} Arkhamm DeFi
                  Tokens`}
                </div>
                <button className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4" onClick={_addLiquidity}>
                  Add
                </button>
              </div>
            )}
            <br />
            <div>
              <input
                type="number"
                placeholder="Amount of LP Tokens"
                onChange={async (e) => {
                  setRemoveLPTokens(e.target.value || "0");
                  await _getTokensAfterRemove(e.target.value || "0");
                }}
                className="block text-white p-6 px-12 max-w-sm bg-white rounded-lg shadow-md hover:bg-background dark:bg-cybornheader dark:hover:bg-white hover:text-black"
              />
              <br />
              <div className="text-white">
                {`You will get ${utils.formatEther(removeAKI)} Arkhamm Tokens and ${utils.formatEther(removeEther)} Matic`}
              </div>
              <br />
              <button className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4" onClick={_removeLiquidity}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="lg:float-right">
        <br />
          <input
            type="number"
            placeholder="Amount"
            onChange={async (e) => {
              setSwapAmount(e.target.value || "");
              await _getAmountOfTokensReceivedFromSwap(e.target.value || "0");
            }}
            className="lg:mr-20 block text-white p-6 px-12 max-w-sm rounded-lg shadow-md hover:bg-background dark:bg-cybornheader dark:hover:bg-white hover:text-black"
            value={swapAmount}
          />
          <br />
          <select
            className="text-white block text-white p-6 px-12 max-w-sm bg-white rounded-lg shadow-md hover:bg-background dark:bg-cybornheader dark:hover:bg-white hover:text-black"
            name="dropdown"
            id="dropdown"
            onChange={async () => {
              setEthSelected(!ethSelected);
              await _getAmountOfTokensReceivedFromSwap(0);
              setSwapAmount("");
            }}
          >
            <option value="Matic">Matic</option>
            <option value="arkhammToken">Arkhamm DeFi Token</option>
          </select>
          <br />
          <div className="text-white lg:mr-20">
            {ethSelected
              ? `You will get ${utils.formatEther(
                  tokenToBeRecievedAfterSwap
                )} Arkhamm DeFi Tokens`
              : `You will get ${utils.formatEther(
                  tokenToBeRecievedAfterSwap
                )} Matic`}
          </div>
          <br />
          <button className="lg:mr-20 w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4" onClick={_swapTokens}>
            Swap
          </button>
        </div>
      );
    }
  };

  return (
    <div className="bg-background">
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
    <CybornHeader />
      <div className={styles.main}>
        <div>
          <h1 className="text-6xl text-white">Arkhamm De-Centralized Exchange Service!</h1>
          <br />
          <div className="text-xl text-white text-center">
            Exchange Matic To Arkhamm Tokens or Arkhamm Tokens To Matic
          </div>
          <br />
          <br />
          <div className="lg:grid grid-cols-2 grid-gap-4 lg:ml-12">
            <button
              className="w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4"
              onClick={() => {
                setLiquidityTab(!liquidityTab);
              }}
            >
              Liquidity
            </button>
            <button
              className="lg:ml-48 w-72 h-16 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center shadow-glow p-4"
              onClick={() => {
                setLiquidityTab(false);
              }}
            >
              Swap
            </button>
          </div>
          {renderButton()}
        </div>
        <div>

        </div>
      </div>
      <CybornFooter />
    </div>
  );
}
