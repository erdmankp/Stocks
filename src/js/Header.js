import './css/Header.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export function Header(){
  const [symbol, setSymbol] = useState('');
 
return(
<div id="header">
        <Link to={`/`}>
          <span id="logo">Stocks<FontAwesomeIcon icon={faChartLine} size="sm"/></span>
        </Link>
        <div id="search_container">
        <input type="text" id="search_button" onChange={event => setSymbol(event.target.value)} placeholder="Search symbols..."></input>
        <Link id="search_button" to={`/search/${symbol}`}><FontAwesomeIcon icon={faSearch} size="sm"/></Link>
        </div>
        <div id="sign_container">
          <button id="log_in">Log In</button>
          <button id="sign_up">Sign Up</button>
        </div>
      </div>
);
}