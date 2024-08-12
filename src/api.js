import axios from 'axios';

const API_KEY = import.meta.env.VITE_CMC_API_KEY;
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

export const getCryptocurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
      params: {
        start: 1,
        limit: 10, 
        convert: 'USD',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency data', error);
    return [];
  }
};
