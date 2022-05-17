import './css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux';
import {Symbol} from './Symbol_Result';
import {Link} from 'react-router-dom';
import {Fragment} from 'react'
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {downloadAnalysis} from './actions';
import {sortSymbols} from './actions';

export function Home() {

  const symbols = useSelector(state => state.symbols);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(downloadAnalysis());
  }, [dispatch]);
  sortSymbols(symbols);

    return(
      <Fragment>
        <div id="top_container">
        <div id="sort_container">
        <div className="choice_container" id="new_option">
          <FontAwesomeIcon icon={faStar} size="sm"/>
          <Link to={`/top`} className="sort_choice" >Top</Link>
        </div>
        <div className="choice_container" id="new_option">
          <FontAwesomeIcon icon={faHourglassStart} size="sm" />
          <Link to={`/new`} className="sort_choice" >New</Link>
        </div>
      </div>
      <Link className="new_post_link" to={'/newpost'}>
      <div className="new_post">
        <FontAwesomeIcon icon={faPen} size="sm" />
        New Post
      </div>
      </Link>
      </div>
      <div className="symbols">
           
          {symbols.map(symbol => <Symbol key={symbol.id} symbol={symbol} />
          )}
      </div>
      </Fragment>
    );
}