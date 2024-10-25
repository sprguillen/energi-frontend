import axios from 'axios';

export async function getAssets() {
  try {
    const response = await axios.get('https://api.energiswap.exchange/v1/assets');
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}