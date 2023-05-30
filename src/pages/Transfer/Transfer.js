import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import { abi, } from './Consent.json';

import { toast, Toaster } from 'react-hot-toast';


import abi from '../../abi/Staking.json';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import './Transfer.css'

import { contractAddress } from "../../utils/contracts-config";


const Transfer = () => {

    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);


    useEffect(() => {
      const loadProvider = async () => {
        if (window.ethereum) {
          await window.ethereum.enable();
          const providerInstance = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
          );
          setProvider(providerInstance);
  
          const signer = providerInstance.getSigner();
          const contractInstance = new ethers.Contract(
            contractAddress,
            abi,
            signer
          );
          setContract(contractInstance);
  
          const accounts = await providerInstance.listAccounts();
          setAccount(accounts[0]);
        }
      };
  
      loadProvider();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        if (contract && account) {
          const tokenBalance = await contract.balanceOf(account);
          setBalance(tokenBalance.toString());
        }
      };
  
      fetchData();
    }, [contract, account]);

    const handleTransfer = async () => {
      if (contract && account && recipient && amount > 0) {
        try {
          const tx = await contract.transfer(recipient, amount);
          await tx.wait();
          toast.success('Transfer Successful');
          setRecipient('');
          setAmount(0);
        } catch (error) {
          console.error('Transfer Error:', error);
          toast.error('Transfer Failed');
        }
      }
    };

  return (
    <div>

      <Navbar />

      <div className='border-2 bodyCheckConsent'>
        <form onSubmit={handleTransfer}>

        <h2>Transfer Tokens</h2>
        <p>Account: {account}</p>
        <p>Token Balance: {balance}</p>
        <div style={{ marginTop: "30px" }}>
            <label>Address:</label>
            <input
              type="text"
              onChange={(event) => setRecipient(event.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Amount:</label>
            <input
              type="text"
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div>
            <button style={{ marginTop: "20px" }} type="submit">Transfer Tokens</button>
          </div>
        </form>
      </div>
      <Footer />
      <Toaster toastOptions={{ duration: 4000 }} />
    </div>
  );
};

export default Transfer;