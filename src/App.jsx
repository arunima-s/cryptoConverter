import React,{useState , useEffect} from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Coin from "./pages/Home/Coin/Coin";
import Home from './pages/Home/Home';



const App = () => {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Coin />} /> 
      </Routes>
    </div>
  );
};

export default App;
