import './css/Symbol_Result.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import {deleteAnalysis} from './actions';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from 'react-redux';
import {likeAnalysis} from './actions';

export function Symbol(props) {
  
    const {symbol} = props;
    const dispatch = useDispatch();
    const time = symbol.created_at.split("T");
    let analysis = symbol.analysis;
    if (analysis.length > 150){
    analysis = analysis.substring(0, 369);
    analysis += "...";
    }
    return(
        <div className="symbol_container">
          <div className="top_container">
          <Link to={`/${symbol.symbol}/${symbol.id}`}><div className="analysis_title">{symbol.title}</div></Link>
            <div id="stock_container">
            <Link to={`/search/${symbol.symbol}`} className="symbol"><span className="symbol">{symbol.symbol}</span></Link>
              <div className="price_target">${symbol.price_target}<span id="price_change"></span></div>
            </div>
          </div>
          <div id="result_analysis">{analysis}</div>
          <div className="bottom_container">
            <button id="like" onClick={() => dispatch(likeAnalysis(symbol, symbol.symbol, symbol.id))}><div className="likes"><FontAwesomeIcon icon={faArrowUp} size="sm"/> {symbol.likes}</div></button>
            <div className="analysis_by">Analysis by <Link id="username" to={`/user/${symbol.username}`}>{symbol.username}</Link></div>
            <div className="created_at">Posted on {time[0]}</div>
            <Link to={`/`}><button id="trash_can" onClick={() => dispatch(deleteAnalysis(symbol.symbol, symbol.id))}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></button></Link>
          </div>
        </div>
     
    );
}