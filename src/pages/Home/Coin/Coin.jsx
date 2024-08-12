import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Coin.css";

const Coin = () => {
  const [amount, setAmount] = useState(0.1); // Default amount of source cryptocurrency
  const [fromCurrency, setFromCurrency] = useState("ETH"); // Default from currency
  const [toCurrency, setToCurrency] = useState("BTC"); // Default to currency
  const [convertedAmount, setConvertedAmount] = useState(0); // Converted amount
  const [rate, setRate] = useState(null); // Conversion rate
  const [cryptoList, setCryptoList] = useState([]); // List of all cryptocurrencies
  const apiKey = "eb87ce30-ef18-4fa1-807c-4136a0951343"; // Replace with your API key

  // Fetch the list of all cryptocurrencies
  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
          {
            headers: {
              'X-CMC_PRO_API_KEY': apiKey,
            },
          }
        );
        setCryptoList(response.data.data);
      } catch (error) {
        console.error("Error fetching the cryptocurrency list", error);
      }
    };
    fetchCryptoList();
  }, [apiKey]);

  // Fetch the conversion rate
  const fetchRate = async () => {
    if (fromCurrency && toCurrency) {
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
          {
            headers: {
              'X-CMC_PRO_API_KEY': apiKey,
            },
            params: {
              amount: 1, // Get the rate for 1 unit of fromCurrency
              symbol: fromCurrency,
              convert: toCurrency,
            },
          }
        );

        // Handle multiple entries and select the correct one
        const data = response.data.data;
        const correctEntry = data.find(
          (entry) => entry.symbol === fromCurrency && entry.quote[toCurrency]
        );

        if (correctEntry) {
          const rate = correctEntry.quote[toCurrency].price;
          setRate(rate);
          setConvertedAmount(amount * rate); // Calculate converted amount using the fetched rate
        } else {
          console.error("Correct entry not found for conversion");
        }
      } catch (error) {
        console.error("Error fetching the conversion rate", error);
      }
    }
  };

  useEffect(() => {
    fetchRate();
  }, [fromCurrency, toCurrency, amount]); // Dependencies include amount, fromCurrency, and toCurrency

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="coin-page">
      <div className="crypto-converter-container">
        <h2>Cryptocurrency Converter</h2>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </label>
        </div>
        <div>
          <label>
            From:
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.symbol}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            To:
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              {cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.symbol}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="converted-amount">
          <strong>Converted Amount:</strong>
          <p>
            {convertedAmount.toFixed(6)} {toCurrency}
          </p>
        </div>
        <div>
          <p className="exchange-rate">
            Exchange Rate: 1 {fromCurrency} ={" "}
            {rate ? rate.toFixed(6) : "Loading..."} {toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;

