import './css/Search.css';
import {useSelector} from 'react-redux';
import {Fragment} from 'react';
import {Symbol} from './Symbol_Result';
import {useParams} from 'react-router-dom';


export function Search(props) {
    const params = useParams();
    const symbols = useSelector(state => state.symbols);
    const incoming_symbol = params.symbol.toUpperCase();
    const analyses = [];
    let search_header = "";
    console.log(symbols);

    symbols.forEach(symbol => {
        if (symbol.symbol === incoming_symbol){
            console.log("yes");
            analyses.push(symbol);
        }
    });
    if (analyses.length === 1){
        search_header = "1 Analysis for " + incoming_symbol;
    }else if (analyses.length > 1){
        search_header = analyses.length + " Analyses for " + incoming_symbol;
    }else{
        search_header = "0 Analyses for " + incoming_symbol;
    }
    return(
     <Fragment>
      <h1 id="search_header">{search_header}</h1>
      <div className="symbols">
          {analyses.sort((a, b) => 0.5 - Math.random()).map(symbol => <Symbol key={symbol.id} symbol={symbol} />
          )}
      </div>

      </Fragment>
    );
}