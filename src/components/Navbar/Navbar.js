import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import Web3 from 'web3'
import { Link } from 'react-router-dom';
import WalletConnectContext from '../../contexts/WalletConnectContext';
import ErrorContext from '../../contexts/ErrorContext';


import './Navbar.css';



const Navbar = () => {
  const { isConnected, setIsConnected } = useContext(WalletConnectContext);
  const { publicKey, setPublicKey } = useContext(WalletConnectContext);
  const { errorOccurred, setErrorOccurred } = useContext(ErrorContext);
  const { error, setError } = useContext(ErrorContext);

  const fetchPublicKey = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setPublicKey(accounts[0]);
    console.log(publicKey);
  }

  useEffect(() => {
    fetchPublicKey();
  })


    const handleConnect = async () => {
      try {
        if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
        await window.ethereum.enable();
        setIsConnected(true);
        } catch (error) {
        console.log(error);
        }
        } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        setIsConnected(true);
        } else {
        setErrorOccurred(true);
        setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
      } catch(err) {
        setErrorOccurred(true);
        setError('Failed to connect to metamask');
      }
    }
      
      const handleDisconnect = () => {
        setIsConnected(false);
        setPublicKey("");
      }
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="text-lg font-medium text-gray-900">
          <div width='150px' height='250px' style={{ fontSize: "30px" }}>JStake</div>
        </Link>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/transfer">
          Transfer
        </Link>
      </div>
      <div className="navbar-actions">
        {isConnected ? 
          <a href="#" className="navbar-action mr-3" onClick={handleDisconnect}>Disconnect</a> 
          :
          <a href="#" className="navbar-action mr-3" onClick={handleConnect}>Connect</a>
        }
      </div>
    </div>
  )
}

export default Navbar