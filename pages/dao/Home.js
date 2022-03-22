import { Contract, providers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import {
  ARKHAMM_DAO_ABI,
  ARKHAMM_DAO_ADDRESS,
  ARKHAMM_CONTRACT_ABI,
  ARKHAMM_CONTRACT_ADDRESS,
} from "/constants";
import styles from "/styles/Home.module.css";
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"

export default function Home() {
  const [treasuryBalance, setTreasuryBalance] = useState("0");
  const [numProposals, setNumProposals] = useState("0");
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [proposals, setProposals] = useState([]);
  const [nftBalance, setNftBalance] = useState(0);
  const [arkhammNftTokenID, setarkhammNftTokenID] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();



  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getDAOTreasuryBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const balance = await provider.getBalance(
        ARKHAMM_DAO_ADDRESS
      );
      setTreasuryBalance(balance.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const getNumProposalsInDAO = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = getDaoContractInstance(provider);
      const daoNumProposals = await contract.numProposals();
      setNumProposals(daoNumProposals.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const getUserNFTBalance = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = getArkhammNFTContractInstance(signer);
      const balance = await nftContract.balanceOf(signer.getAddress());
      setNftBalance(parseInt(balance.toString()));
    } catch (error) {
      console.error(error);
    }
  };

  const createProposal = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);
      const txn = await daoContract.createProposal(arkhammNftTokenID);
      setLoading(true);
      await txn.wait();
      await getNumProposalsInDAO();
      setLoading(false);
    } catch (error) {
      console.error(error);
      window.alert(error.data.message);
    }
  };


  const fetchProposalById = async (id) => {
    try {
      const provider = await getProviderOrSigner();
      const daoContract = getDaoContractInstance(provider);
      const proposal = await daoContract.proposals(id);
      const parsedProposal = {
        proposalId: id,
        nftTokenId: proposal.nftTokenId.toString(),
        deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
        approveAKM: proposal.approveAKM.toString(),
        denyAKM: proposal.denyAKM.toString(),
        executed: proposal.executed,
      };
      return parsedProposal;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllProposals = async () => {
    try {
      const proposals = [];
      for (let i = 0; i < numProposals; i++) {
        const proposal = await fetchProposalById(i);
        proposals.push(proposal);
      }
      setProposals(proposals);
      return proposals;
    } catch (error) {
      console.error(error);
    }
  };


  const voteOnProposal = async (proposalId, _vote) => {
    try {
      const signer = await getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);

      let vote = _vote === "AKMY" ? 0 : 1;
      const txn = await daoContract.voteOnProposal(proposalId, vote);
      setLoading(true);
      await txn.wait();
      setLoading(false);
      await fetchAllProposals();
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  const executeProposal = async (proposalId) => {
    try {
      const signer = await getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);
      const txn = await daoContract.executeProposal(proposalId);
      setLoading(true);
      await txn.wait();
      setLoading(false);
      await fetchAllProposals();
    } catch (error) {
      console.error(error);
      window.alert(error.data.message);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 137) {
      window.alert("Please switch to the Polygon Main network!");
      throw new Error("Please switch to the Polygon Main network");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


  const getDaoContractInstance = (providerOrSigner) => {
    return new Contract(
      ARKHAMM_DAO_ADDRESS,
      ARKHAMM_DAO_ABI,
      providerOrSigner
    );
  };


  const getArkhammNFTContractInstance = (providerOrSigner) => {
    return new Contract(
      ARKHAMM_CONTRACT_ADDRESS,
      ARKHAMM_CONTRACT_ABI,
      providerOrSigner
    );
  };


  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet().then(() => {
        getDAOTreasuryBalance();
        getUserNFTBalance();
        getNumProposalsInDAO();
      });
    }
  }, [walletConnected]);

  useEffect(() => {
    if (selectedTab === "View Proposals") {
      fetchAllProposals();
    }
  }, [selectedTab]);

  function renderTabs() {
    if (selectedTab === "Create Proposal") {
      return renderCreateProposalTab();
    } else if (selectedTab === "View Proposals") {
      return renderViewProposalsTab();
    }
    return null;
  }

  function renderCreateProposalTab() {
    if (loading) {
      return (
        <div className={styles.description}>
          Loading... Waiting for transaction...
        </div>
      );
    } else if (nftBalance === 0) {
      return (
        <div className={styles.description}>
          You have not minted Arkhamm NFT. <br />
          <b>So you cannot approve or deny the Arkhamm proposals</b>
        </div>
      );
    } else {
      return (
        <div className="text-white text-xl">
          <label>Arkhamm NFT Token ID to Purchase: </label>
          <br />
          <br />
          <input
            className="bg-background border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            type="number"
            onChange={(e) => setarkhammNftTokenID(e.target.value)}
          />
          <br />
          <form onSubmit={(e) => e.preventDefault()} className="Search__form">
          <input
            className="bg-background border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your proposal"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <br />
          <div className="grid grid-cols-2 grid-gap-4">
            <button className="block w-full py-4 px-20 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" onClick={()=>setSubmittedInput(input)}>Set Proposal</button>

            <button className="block w-full py-4 px-24 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring" onClick={createProposal}>
              Create
            </button>
          </div>
          </form>
          <br />

        </div>
      );
    }
  }


  function renderViewProposalsTab() {
    if (loading) {
      return (
        <div className="block w-full py-4 ml-8 px-4 text-sm font-medium text-white rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
          Loading... Waiting for transaction...
        </div>
      );
    } else if (proposals.length === 0) {
      return (
        <div className="text-white text-xl">No Arkhamm proposals have been created</div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 grid-gap-4">
          {proposals.map((p, index) => (
            <div key={index} className="text-white text-center text-xl block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p>Proposal ID: {p.proposalId}</p>
              <p>Proposal Token: {p.nftTokenId}</p>
              <p>Proposal: {submittedInput}</p>
              <p>Deadline: {p.deadline.toLocaleString()}</p>
              <p>Approve AKM: {p.approveAKM}</p>
              <p>Deny AKM: {p.denyAKM}</p>
              <p>Executed: {p.executed.toString()}</p>
              {p.deadline.getTime() > Date.now() && !p.executed ? (
                <div className="grid grid-cols-1 grid-gap-4">
                  <button
                    className="block w-full py-4 ml-8 px-4 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
                    onClick={() => voteOnProposal(p.proposalId, "AKMY")}
                  >
                    Vote AKMY
                  </button>
                  <br />
                  <button
                    className="block w-full py-4 ml-8 px-4 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
                    onClick={() => voteOnProposal(p.proposalId, "AKMN")}
                  >
                    Vote AKMN
                  </button>
                </div>
              ) : p.deadline.getTime() < Date.now() && !p.executed ? (
                <div className={styles.flex}>
                  <button
                    className="block w-full py-4 ml-8 px-4 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
                    onClick={() => executeProposal(p.proposalId)}
                  >
                    Execute Proposal{" "}
                    {p.approveAKM > p.denyAKM ? "(AKMY)" : "(AKMN)"}
                  </button>
                </div>
              ) : (
                <div className="">Proposal Executed</div>
              )}
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div className=" h-full w-screen antialiased">
    <CybornHeader />
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>

      <div className="flex bg-background h-full justify-center items-center flex-col md:flex-row">
        <div className="p-10 flex-1 md:p-20">
        <h1 className="text-6xl text-white font-bold text-white text-center">Arkhamm De-centralized Autonomous Organization</h1>
          <br />
          <div className="grid grid-cols-3 grid-gap-8">
          <p className="block p-6 max-w-sm bg-white border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center text-white text-xl font-light text-center text-primary-700 md:text-left">ARKHAMM NFT in Your Wallet: {nftBalance}</p>
          <p className="block p-6 max-w-sm bg-white border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center text-white text-xl font-light text-center text-primary-700 md:text-left">ARKHAMM Treasury: {formatEther(treasuryBalance)} Matic</p>
          <p className="block p-6 max-w-sm bg-white border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center text-white text-xl font-light text-center text-primary-700 md:text-left">Total Number of ARKHAMM Proposals: {numProposals}</p>
          </div>
          <br />
          <br />
          <div className="flex flex-col items-center grid grid-cols-2 grid-gap-4 md:items-start">
          <button
            className="block w-full py-4 px-4 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
            onClick={() => setSelectedTab("Create Proposal")}
          >
            Create Proposal
          </button>
          <button
            className="block w-full py-4 px-4 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring"
            onClick={() => setSelectedTab("View Proposals")}
          >
            View Proposals
          </button>

          </div>
          <br />
          <br />
          {renderTabs()}
        </div>
        <div className="flex-1 shrink-0">
          <div className="flex-1 shrink-0 w-full object-cover md:h-screen">
            <video className="w-full h-screen object-cover" src="/DAO.mp4" autoPlay muted loop playsInline />
        </div>
      </div>
      </div>
      <CybornFooter />
    </div>

  );
}
