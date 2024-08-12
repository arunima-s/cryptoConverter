import React, { useEffect, useState } from 'react';
import { getCryptocurrencies } from '../api';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getCryptocurrencies();
      setCryptos(data);
    };

    fetchCryptos();
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt={crypto.name} width="32" height="32" />
            {crypto.name} ({crypto.symbol}): ${crypto.quote.USD.price.toFixed(2)}
            <p>24H Change: {crypto.quote.USD.percent_change_24h.toFixed(2)}%</p>
            <p>7 Days Change: {crypto.quote.USD.percent_change_7d.toFixed(2)}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
