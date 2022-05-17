import './css/Analysis.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {Fragment} from 'react';
import {deleteAnalysis} from './actions';
import { likeAnalysis } from './actions';

export function Analysis(props) {
    const dispatch = useDispatch();
    const symbols = useSelector(state => state.symbols);
    const params = useParams();
    const incoming_id = parseInt(params.id);
    let incoming_symbol = props.symbol;
    let symbol = symbols.find(symboli => symboli.id === incoming_id);
    console.log(symbol);
    console.log(incoming_id);
    console.log(symbols);
    let split_time = [];
    let time = 0;
    let price_target = 0;
    let likes = 0;
    let username = "";
    let title = "";
    let current_analysis = "";
    if (symbol !== undefined){
    split_time = symbol.created_at.split("T");
    time = split_time[0];
    price_target = symbol.price_target;
    likes = symbol.likes;
    username = symbol.username;
    title = symbol.title;
    current_analysis = symbol.analysis;
    incoming_symbol = symbol.symbol;
    }
    console.log(current_analysis);
    return(
       <Fragment>
        <div className="symbol_container">
          <div className="top_container">
          <div className="analysis_title">{title}</div>
            <div id="stock_container">
            <Link to={`/search/${incoming_symbol}`} className="symbol"><span className="symbol">{incoming_symbol}</span></Link>
              <div className="price_target">${price_target}</div>
            </div>
          </div>
          
          <textarea readonly="yes" id="main_analysis" className="analysis" value={current_analysis}>{current_analysis}</textarea>
          <div className="bottom_container">
          <button id="like" onClick={() => dispatch(likeAnalysis(symbol, incoming_symbol, incoming_id))}><div className="likes"><FontAwesomeIcon icon={faArrowUp} size="sm"/> {likes}</div></button>
            <div className="analysis_by">Analysis by <Link id="username" to={`/user/${username}`}>{username}</Link></div>
            <div className="created_at">Posted on {time}</div>
            <Link id="edit" to={`/${incoming_symbol}/${incoming_id}/edit`}><button id="edit">Edit</button></Link>
            <Link to={`/`}><button id="trash_can" onClick={() => dispatch(deleteAnalysis(incoming_symbol, incoming_id))}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></button></Link>
          </div>
        </div>
        
        </Fragment>
    );
}