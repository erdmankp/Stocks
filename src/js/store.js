import {createStore, applyMiddleware} from 'redux';
import {Action} from './actions';
import thunk from 'redux-thunk';

function reducer(state, action) {
    switch(action.type){
      case Action.ShowAnalysis:
        
        return {
          ...state,
          symbols: [...state.symbols],
        };

      case Action.LoadAnalysis:
        const analyses = action.payload;
        for (let i = 0; i < analyses.length; i++){
          if(state.symbols.find(symboli => symboli.id === analyses[i].id) === undefined){
          state.symbols.push(analyses[i]);
          }
        }
        return {
          ...state,
          symbols: [...state.symbols],
        };
        case Action.StartedWaiting:
          return {
            ...state,
            isWaiting: true,
          };
        case Action.StoppedWaiting:
          return {
            ...state,
            isWaiting: false,
          };
          case Action.AddAnalysis:
            return {
            ...state,
            symbols: [...state.symbols]
            };
            case Action.RemoveAnalysis:
      return {
        ...state,
        symbols: state.symbols.filter(symbol => symbol.id !== action.payload),
      };
      case Action.Edit:
              return {
                ...state,
                symbols: state.symbols.map(symbol => {
                  if (symbol.id === action.payload.id) {
                    return action.payload;
                  } else {
                    return symbol;
                  }
                }),
              }
           case Action.Like:
           return{
             ...state,
             symbols: state.symbols.map(symbol => {
              if (symbol.id === action.payload.id) {
                return action.payload;
              } else {
                return symbol;
              }
            }),
           }
        default:
      return state;
    }
}

const initialState = {
  symbols: [
    /**{
        id: 1,
        user: "stockAnalyst32",
        symbol: "AAPL",
        title: "A case for Apple to reach $170!",
        likes: 323,
        dislikes: 3,
        price_target: 170,
        buy_signal: 30,
        sell_signal: 13,
        analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at: "Dec. 12 2020",
        updated_at: "Dec. 13 2020"
    },
    {
        id: 2,
        user: "stockAnalyst32",
        symbol: "test",
        title: "Lorem ipsum dolor sit amet",
        likes: 20,
        dislikes: 3,
        price_target: 300,
        buy_signal: 30,
        sell_signal: 13,
        analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reated_at: "Dec. 12 2020",
        updated_at: "Dec. 13 2020"
    },
    {
        id: 3,
        user: "stockAnalyst32",
        symbol: "test",
        title: "Lorem ipsum dolor sit amet",
        likes: 20,
        dislikes: 3,
        price_target: 300,
        buy_signal: 30,
        sell_signal: 13,
        analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at: "Dec. 12 2020",
        updated_at: "Dec. 13 2020"
    },
    {
        id: 4,
        user: "stockAnalyst32",
        symbol: "test",
        title: "Lorem ipsum dolor sit amet",
        likes: 20,
        dislikes: 3,
        price_target: 300,
        buy_signal: 30,
        sell_signal: 13,
        analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at: "Dec. 12 2020",
        updated_at: "Dec. 13 2020"
    },
    {
        id: 5,
        user: "stockAnalyst32",
        symbol: "test",
        title: "Lorem ipsum dolor sit amet",
        likes: 20,
        dislikes: 3,
        price_target: 300,
        buy_signal: 30,
        sell_signal: 13,
        analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at: "Dec. 12 2020",
        updated_at: "Dec. 13 2020"
    },
    {
        id: 6,
        user: "stockAnalyst32",
        symbol: "test",
        title: "Lorem ipsum dolor sit amet",
        likes: 20,
        dislikes: 3,
        price_target: 300,
        buy_signal: 30,
        sell_signal: 13,
        analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at: "Dec. 12 2020",
        updated_at: "Dec. 13 2020"
    },
    {
      id: 7,
      user: "stockAnalyst32",
      symbol: "test",
      title: "Lorem ipsum dolor sit amet",
      likes: 20,
      dislikes: 3,
      price_target: 300,
      buy_signal: 30,
      sell_signal: 13,
      analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      created_at: "Dec. 12 2020",
      updated_at: "Dec. 13 2020"
  },
  {
    id: 8,
    user: "stockAnalyst32",
    symbol: "test",
    title: "Lorem ipsum dolor sit amet",
    likes: 20,
    dislikes: 3,
    price_target: 300,
    buy_signal: 30,
    sell_signal: 13,
    analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    created_at: "Dec. 12 2020",
    updated_at: "Dec. 13 2020"
},
{
  id: 9,
  user: "stockAnalyst32",
  symbol: "test",
  title: "Lorem ipsum dolor sit amet",
  likes: 20,
  dislikes: 3,
  price_target: 300,
  buy_signal: 30,
  sell_signal: 13,
  analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  created_at: "Dec. 12 2020",
  updated_at: "Dec. 13 2020"
},**/
  ],
  isWaiting: false,
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));


