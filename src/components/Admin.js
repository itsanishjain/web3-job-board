import React from "react";
import { ethers } from "ethers";
import JobBoardABI from "../../jobBoard.json";
import { requestAccount } from "../../utils";

export default function Admin() {
  // returns the owner of smart contract
  async function getAdmin() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_JOBBOARD_ADDRESS,
      JobBoardABI,
      provider
    );
    try {
      await requestAccount();
      const data = await contract.admin();
      const signer = provider.getSigner();

      const signerAddress = await signer.getAddress();
      if (data == signerAddress) {
        console.log("Hello, admin");
        withdrawFunds(data);
      } else {
        console.log("You are not admin get the fuck off");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function used to withdraw funds from Smart contract
  const withdrawFunds = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_JOBBOARD_ADDRESS,
      JobBoardABI,
      signer
    );
    try {
      await requestAccount();
      await contract.withdraw(address);
      console.log("DONE");
    } catch (err) {
      console.log("ERROR :)", err);
    }
  };

  // delete the job from the smart contract
  const deleteAJob = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_JOBBOARD_ADDRESS,
      JobBoardABI,
      signer
    );
    try {
      await contract.deleteJob(0);
      console.log("DONE");
    } catch (err) {
      console.log("ERROR :)", err);
    }
  };

  return (
    <div>
      <p>Welcom admin</p>
      <button onClick={getAdmin}>Withdraw</button>
      <button onClick={() => deleteAJob(0)}>Delete a job</button>
    </div>
  );
}
