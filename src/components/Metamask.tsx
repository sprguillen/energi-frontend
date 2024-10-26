import React from 'react';
import { MetamaskProps } from '../interfaces';
import MetamaskImg from '../assets/metamask.svg';

const Metamask: React.FC<MetamaskProps> = ({ connectWallet }) => {
  return (
    <div className="flex flex-col items-center justify-center">
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

export default Metamask;
