import './css/Profile.css';
import {useSelector} from 'react-redux';
import {Fragment} from 'react';
import {Symbol} from './Symbol_Result';
import {useParams} from 'react-router-dom';


export function Profile(props) {
    const params = useParams();
    const symbols = useSelector(state => state.symbols);
    const user = params.username;
    const analyses = [];
    symbols.forEach(symbol => {
        if (symbol.username === user){
            analyses.push(symbol);
        }
    });

    return(
     <Fragment>
      <h1 id="username_profile">{user}'s Analyses</h1>
      <div className="symbols">
           
          {analyses.sort((a, b) => 0.5 - Math.random()).map(symbol => <Symbol key={symbol.id} symbol={symbol} />
          )}
      </div>
      </Fragment>
    );
}