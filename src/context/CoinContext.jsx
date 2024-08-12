import { createContext, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allcoin,SetAllCoin] =useState([]);
    const [currency, setCurrency] = useState({
        name : "usd",
        symbol : "$"
    }) 
   
  const contextValue = {};
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
