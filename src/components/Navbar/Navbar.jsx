import React, { useContext } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className='navbar'>
        {/* <ul> */}
            <li> <Link to="/">Home</Link></li>
            <li><Link to="/coin/bitcoin">Crypto Converter</Link></li>

        {/* </ul> */}
        {/* <div className='nav-right'>
            <select >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
            </select>
          
        </div> */}
      
    </div>
  )
}

export default Navbar
