import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="w-[1280px]">
      <nav className="border-b-2 border-gray-200 mx-auto">
        <div className="flex flex-wrap items-center justify-center mx-auto p-4">
          <ul className="flex flex-col">
            <li>
              <Link
                className={`py-4 px-3 hover:text-green-500 ${location.pathname === '/' ? 'text-black border-b-4 border-green-500' : 'text-gray-300'}`}
                to="/"
              >
                <HomeIcon className="mr-2" />
                Home
              </Link>
              <Link
                className={`py-4 px-3 hover:text-green-500 ${location.pathname === '/wallet' ? 'text-black border-b-4 border-green-500' : 'text-gray-300'}`}
                to="/wallet"
              >
                <WalletIcon className="mr-2" />
                Wallet
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;
