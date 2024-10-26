import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import Metamask from '../components/Metamask';
import Spinner from '../components/Spinner';
import { ToastContext } from '../context/Toast';
import MetamaskImg from '../assets/metamask.svg';
import NrgeImg from '../assets/nrge.svg';
import { ABI, ADDRESS } from '../artifacts/abi';
import { getNgrePriceInUSD } from '../../lib/api';

const Wallet: React.FC = () => {
  const useToast = () => useContext(ToastContext);
  const { showInfo, showError } = useToast();
  const [account, setAccount] = useState<string | null>(localStorage.getItem('account'));
  const [ngreBalance, setNgreBalance] = useState<number | string>();
  const [usdPrice, setUsdPrice] = useState<number | string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
        localStorage.setItem('account', accounts[0]);
      });
    }

    const getUSDBalance = async () => {
      const balance = await getNgrePriceInUSD();
      setUsdPrice(balance);
    }

    getUSDBalance();
  });

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      const getTokenBalance = async () => {
        const contract = new web3.eth.Contract(ABI, ADDRESS);
        const balance = await contract.methods.balanceOf(account).call();
        const decimals = await contract.methods.decimals().call();
        setNgreBalance(BigNumber(balance).div(decimals).toLocaleString());
        setLoading(false);
      }

      getTokenBalance();
    }
  }, [account]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0] || null);
      localStorage.setItem('account', accounts[0]);
    } else {
      showError('Please download the Metamask extension on your browser.')
    }
  }

  const copyHandler = async () => {
    try {
      if (account) {
        await navigator.clipboard.writeText(account);
      }
      
      showInfo('Copied address to clipboard.');
    } catch (err) {
      console.log(err);
    }
  }

  const openScanHandler = async () => {
    if (account) {
      const url = `https://explorer.energi.network/address/${account}/transactions`
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <>
      {
        account ? (
          <div className="
            w-full p-6 bg-white border 
            border-gray-200 rounded-lg shadow 
            dark:bg-gray-800 dark:border-gray-700
          ">
            <div className="flex justify-between mb-2">
              <span className="font-bold flex dark:text-gray-400">
                <img src={NrgeImg} alt="NRGE logo" className="w-6 h-6 mr-1" />
                Energi Network
              </span>
              <div className="flex">
                <div className="w-2 h-2 bg-green-400 rounded-full my-auto mr-2" />
                <span className="text-green-400 font-semibold text-sm my-auto">Connected</span>
              </div>
            </div>
            <hr />
            <div className="flex justify-between mt-2">
              <div className="flex space-x-2 dark:text-gray-400">
                <img src={MetamaskImg} className="w-8 h-8" alt="Metamask Icon" />
                <span className="my-auto">{ `${account.slice(0, 6)}...${account.slice(-8)}` }</span>
              </div>
              <div className="flex space-x-2">
                <FileCopyIcon className="cursor-pointer dark:text-white" onClick={copyHandler} />
                <LaunchIcon className="cursor-pointer dark:text-white" onClick={openScanHandler} />
              </div>
            </div>
            {
              loading ? <Spinner /> : (
                <div className="mt-8 flex flex-col">
                  <h2 className="text-gray-400 ">Total Balance</h2>
                  <div className="flex justify-center items-center mt-2">
                    <img src={NrgeImg} alt="NRGE logo large" className="w-12 h-12 mr-1" />
                    <span className="text-2xl font-medium dark:text-white">{ngreBalance}</span>
                  </div>
                  <div className="flex justify-center items-center mt-2">
                    <span className="text-2xl font-medium dark:text-white">${Number(ngreBalance) * Number(usdPrice)}</span>
                  </div>
                </div>
              )
            }
          </div>
        ) : (
          <Metamask connectWallet={connectWallet} />
        )
      }
    </>
  )
}

export default Wallet;
