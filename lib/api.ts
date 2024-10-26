import axios from 'axios';
import { ADDRESS } from '../src/artifacts/abi';

export async function getAssets() {
  try {
    const response = await axios.get('https://api.energiswap.exchange/v1/assets');
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getNgrePriceInUSD() {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${ADDRESS}&vs_currencies=usd`);
    const { data } = response;
    return data[ADDRESS].usd;
  } catch (error: any) {
    throw new Error(error);
  }
}
