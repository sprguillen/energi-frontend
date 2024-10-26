import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="w-[1280px] dark:bg-gray-800">
      <nav className="border-b-2 border-gray-200 dark:border-gray-900 mx-auto">
        <div className="flex flex-wrap items-center justify-center mx-auto p-4">
          <ul className="flex flex-col">
            <li>
              <Link
                className={`py-4 px-3 hover:text-green-500 font-semibold ${location.pathname === '/' ? 'text-black dark:text-white border-b-4 border-green-500' : 'text-gray-300 dark:text-gray-200'}`}
                to="/"
              >
                <HomeIcon className="mr-2 dark:text-gray-500" />
                Home
              </Link>
              <Link
                className={`py-4 px-3 hover:text-green-500 font-semibold ${location.pathname === '/wallet' ? 'text-black dark:text-white border-b-4 border-green-500' : 'text-gray-300 dark:text-gray-200'}`}
                to="/wallet"
              >
                <WalletIcon className="mr-2 dark:text-gray-500" />
                Wallet
              </Link>
            </li>
          </ul>
        </div>
        <ModeToggle />
      </nav>
    </header>
  )
}

export default Header;
