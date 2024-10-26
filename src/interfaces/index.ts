import { ReactNode } from 'react';

export type Theme = 'dark' | 'light';

export interface Asset {
  index: number,
  address: string,
  name: string,
  symbol: string,
  lastPrice: number,
  makerFee: number,
  takerFee: number,
}

export interface ToastContextProps {
  children: ReactNode;
}

export interface PaginateOnClick {
  index: number | null;
  selected: number;
  nextSelectedPage: number | undefined;
  event: object;
  isPrevious: boolean;
  isNext: boolean;
  isBreak: boolean;
  isActive: boolean;
}

export interface PaginationProps {
  pageCount: number,
  onClick: (event: PaginateOnClick) => void,
}

export interface MetamaskProps {
  connectWallet: () => void,
}

export interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

export interface ThemeContextProps {
  children: ReactNode;
}
