import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CMC_PRO_API_KEY': 'eb87ce30-ef18-4fa1-807c-4136a0951343',
          "Access-Control-Allow-Origin": "https://pro-api.coinmarketcap.com",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
      });

      const contentType = response.headers.get('Content-Type');
      if (!response.ok || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const result = await response.json();
      setCryptoData(result.data); // Assuming result.data contains the array of cryptocurrencies
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>CRYPTO HUB<br/></h1>
        <h2>Analyze, Track, Transform</h2>
        <p>
          Your gateway to real-time tracking and seamless conversion of
          cryptocurrencies.
        </p>
        {/* <form>
          <input type="text" placeholder="Search crypto.." />
          <button type="submit">Search</button> 
        </form> */}
      </div>
      <div className="crypto-table">
        <div className="table-layout header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H</p>
         
          <p className="market-cap">7 Days</p> 
        </div>
        {cryptoData.map((crypto, index) => (
          <div className="table-layout" key={crypto.id}>
            <p>{index + 1}</p>
            <p>
              <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt={crypto.name} className="crypto-logo" /> 
              {crypto.name} ({crypto.symbol})
            </p>
            <p>${crypto.quote.USD.price.toFixed(2)}</p>
            <p style={{ 
              textAlign: 'center', 
              color: crypto.quote.USD.percent_change_24h >= 0 ? 'green' : 'red' 
            }}>
              {crypto.quote.USD.percent_change_24h.toFixed(2)}%
            </p>
            <p style={{ 
              color: crypto.quote.USD.percent_change_7d >= 0 ? 'green' : 'red' 
            }}>
              {crypto.quote.USD.percent_change_7d.toFixed(2)}%
            </p>
            {/* <p className="market-cap">${crypto.quote.USD.market_cap.toLocaleString()}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;