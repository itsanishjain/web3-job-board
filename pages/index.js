import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import JobBoardABI from "../jobBoard.json";
import { hasEthereum } from "../utils";
import Board from "../src/components/Board";
import toast from "../src/components/Toast";

export default function Home() {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const [allJobsState, setAllJobsState] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      notify("error", "MetaMask unavailable");
      setConnectedWalletAddressState(`MetaMask unavailable`);
      setLoading(false);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        console.log("HEYYY,", signerAddress);
        setConnectedWalletAddressState(signerAddress);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
    getAdmin();
    fetchAllJobs();
  }, []);

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  async function getAdmin() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_JOBBOARD_ADDRESS,
      JobBoardABI,
      provider
    );
    try {
      const data = await contract.admin();
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      if (data == signerAddress) {
        console.log("HELLO ADMIN");
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Call smart contract, fetch all jobs
  async function fetchAllJobs() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_JOBBOARD_ADDRESS,
      JobBoardABI,
      provider
    );
    try {
      const data = await contract.allJobs();
      console.log("ALL JOBS", data);
      setAllJobsState(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <Head>
        <title>web3-job-board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="recipe">
        hey I am simple job board website build with smart contract AKA
        blockchain and Nextjs so I don't Have any centerlized database. use me
        to post your jobs with just 0.005ETH = 15$
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        allJobsState &&
        allJobsState.map((job, index) => (
          <div key={index}>
            <Board
              companyName={job.companyName}
              position={job.position}
              employmentType={job.employmentType}
              location={job.location}
              companyWebsiteUrl={job.companyWebsiteUrl}
            />
            <div style={{ marginTop: "15px" }}></div>
          </div>
        ))
      )}
      {isAdmin ? "Welcom Admin" : null}
    </div>
  );
}