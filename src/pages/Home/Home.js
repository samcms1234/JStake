import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers';

import bg from '../../assets/bg.png'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { contractAddress } from '../../utils/contracts-config'
import WalletConnectContext from '../../contexts/WalletConnectContext';
import abi from '../../abi/Staking.json'

import './Home.css';

const Home = () => {

  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [stakingBalance, setStakingBalance] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [amount, setAmount] = useState(0);

  const { isConnected, setIsConnected } = useContext(WalletConnectContext);
  const { publicKey, setPublicKey } = useContext(WalletConnectContext);


  const fetchPublicKey = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setPublicKey(accounts[0]);
    console.log(publicKey);
  }

  useEffect(() => {
    fetchPublicKey();
  })

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

        const stakedBalance = await contract.stakedBalance(account);
        setStakingBalance(stakedBalance.toString());

        const userRewards = await contract.calculateRewards(account);
        setRewards(userRewards.toString());
      }
    };

    fetchData();
  }, [contract, account]);

  const handleStake = async (amount) => {
    if (contract && account) {
      try {
      await contract.stake(amount, { value: ethers.utils.parseEther('0') });
      toast.success(`Successfully Staked ${amount} `);
      } catch(error) {
        console.log('Failed to stake!');
        toast.error('Failed to stake');
      }
    }
  };

  const handleUnstake = async (amount) => {
    if (contract && account) {
      try {
      await contract.unstake(amount);
      toast.success(`Successfully Unstaked ${amount} `);
      } catch(err) {
        console.log('Failed to Unstake');
        toast.error('Failed to Unstake');
      }
    }
  };

  const handleClaimRewards = async () => {
    if (contract && account) {
      try {
      await contract.claimRewards();
      toast.success('Successfully claimed reward');
      } catch(error) {
        console.log('Failed to claim reward');
        toast.error('Failed to claim reward');
      }
    }
  };



  return (
    <div>
        <Navbar />

        <div class="bg-cover bg-center h-screen w-screen" style={{ backgroundImage: `url(${bg})`}}>
        <div class="container mx-auto p-8 flex flex-col items-center justify-center h-full">
            <div class="container text-white text-center mt-30">
                <h1 class="heading text-5xl font-medium">Transfer, Stake & Store your Tokens</h1>
                <p class="heading text-xl mt-6">Address: {publicKey}</p>
            </div>

            <div class="mt-40 container text-white text-center w-2/5 rounded-2xl border-2 border-gray-800 p-10">
                <p className="heading text-gray-800 text-xl leading-relaxed">
                  <p>Account: {account}</p>
                  <p>Token Balance: {balance}</p>
                  <p>Staked Balance: {stakingBalance}</p>
                  <p>Rewards: {rewards}</p>
                </p>
                <input
                type="text"
                onChange={(event) => setAmount(event.target.value)}
              />
              <div className="mt-8">
                <button class='heading bg-red-500 text-white p-3 rounded-md hover:bg-red-600' onClick={() => handleStake(amount || 10)}>Stake Tokens</button>
                <button class='heading bg-red-500 text-white p-3 rounded-md hover:bg-red-600 ml-8' onClick={() => handleUnstake(amount || 10)}>Unstake Tokens</button>
                <button class='heading bg-red-500 text-white p-3 rounded-md hover:bg-red-600 ml-8' onClick={handleClaimRewards}>Claim Rewards</button>
              </div>
            </div>
        </div>
    </div>
    <Footer />
    <Toaster toastOptions={{ duration: 4000 }} />
    </div>
  )
}

export default Home
