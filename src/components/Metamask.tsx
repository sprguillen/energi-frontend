import React, { useEffect, useState } from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MetamaskImg from '../assets/metamask.svg';

const Metamask: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      // Clean up the event listener when the component is unmounted
      return () => {
        window.ethereum?.removeListener('accountsChanged', setAccount);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0] || null);
    } else {
      // toast the error
    }
  }

  const copyHandler = async () => {
    try {
      if (account) {
        await navigator.clipboard.writeText(account);
      }
      
      // toast
    } catch (err) {
      // toast
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
              <span className="font-bold">Energi Network</span>
              <div className="flex">
                <div className="w-2 h-2 bg-green-400 rounded-full my-auto mr-2" />
                <span className="text-green-400 font-semibold text-sm my-auto">Connected</span>
              </div>
            </div>
            <hr />
            <div className="flex justify-between mt-2">
              <div>
                <img src={MetamaskImg} className="w-8 h-8" alt="Metamask Icon" />
                { `${account.slice(0, 6)}...${account.slice(-8)}` }
              </div>
              <div>
                <FileCopyIcon onClick={copyHandler} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <img src={MetamaskImg} className="h-72 w-72" alt="Metamask Icon" />
            <h1 className="text-black dark:text-white mb-8">METAMASK</h1>
            <button
              type="button"
              className="
                focus:outline-none text-white bg-green-700 
                hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                dark:bg-green-600 dark:hover:bg-green-700 
                dark:focus:ring-green-800
              "
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          </div>
        )
      }
    </>
  )
}

export default Metamask;
