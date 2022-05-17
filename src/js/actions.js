import './css/Home.css';

export const Action = Object.freeze( {
    ShowAnalysis: 'ShowAnalysis',
    LoadAnalysis: 'LoadAnalysis',
    AddAnalysis: 'AddAnalysis',
    RemoveAnalysis: 'RemoveAnalysis',
    Like: 'Like',
    Edit: 'Edit',
    StartedWaiting:"StartedWaiting",
    StoppedWaiting: "StoppedWaiting",
  });
  function assertResponse(response) {
    if (response.status >= 200 || response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
  
  export function likeAnalysis(symbol_object, symbol, id){
    
    const new_symbol_object = {
      id: symbol_object.id,
      likes: symbol_object.likes + 1,
      symbol: symbol_object.symbol,
      price_target: symbol_object.price_target,
      analysis: symbol_object.analysis,
      title: symbol_object.title,
      username: symbol_object.username,
      created_at: symbol_object.created_at,
    }
    return dispatch => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_symbol_object),
      };
     
      dispatch(showProgress());
      fetch(`https://project2.erdmannk.xyz:8443/${symbol}/${id}/like`, options)
        .then(assertResponse)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            dispatch(like(new_symbol_object));
            dispatch(hideProgress());
          }
        });
    };
  }
  export function deleteAnalysis(symbol, id) {
    return dispatch => {
      const options = {
        method: 'DELETE',
      };
     
      dispatch(showProgress());
      fetch(`https://project2.erdmannk.xyz:8443/${symbol}/${id}`, options)
        .then(assertResponse)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            dispatch(removeAnalysis(id));
            dispatch(hideProgress());
          }
        });
    };
  }

  export function newAnalysis(symbol, price_target, title, analysis, username) {
    var likes = 0;
    var dislikes = 0;
    var dateObj = new Date();
    var month = dateObj.getUTCMonth()+1;
    var day = dateObj.getUTCDate();
    
    if (day.toString().length === 1){
      day = "0" + day.toString();
    }
    var year = dateObj.getUTCFullYear();
    var created_at = year + "-" + month + "-" + day;
    const analysis_object = {
      symbol,
      likes,
      dislikes, 
      price_target,
      analysis,
      title,
      username,
      created_at
    };

    return dispatch => {
      dispatch(showProgress());
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysis_object),
      };
      
      fetch(`https://project2.erdmannk.xyz:8443/${symbol}`, options)
      .then(assertResponse)
        .then(response => response.json())
        .then(data => {
          dispatch(addAnalysis(analysis_object));
          dispatch(hideProgress());
        });
    };
  }
  export function downloadAnalysis() {
    return dispatch => {
      dispatch(showProgress());
      fetch(`https://project2.erdmannk.xyz:8443/analyses`)
        .then(response => response.json())
        .then(data => {
          dispatch(loadAnalysis(data.results));
          dispatch(hideProgress());
        });
    };
  }

  export function editAnalysis(symbol_object, symbol, id, analysis){
    if (analysis === ""){
      analysis = symbol_object.analysis;
    }
    symbol_object.analysis = analysis;

    return dispatch => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(symbol_object),
      };
      
      dispatch(showProgress());
      fetch(`https://project2.erdmannk.xyz:8443/${symbol}/${id}`, options)
        .then(assertResponse)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            dispatch(edit(symbol_object));
            dispatch(hideProgress());
          }
        });
    };
  }
  export function sortSymbols(symbols){
   
     if (window.location.pathname.includes("new")){
     symbols.sort(function compare(a, b) {
      var dateA = new Date(a.created_at);
      var dateB = new Date(b.created_at);
      return dateB - dateA;
    });
    }else if (window.location.pathname.includes("top")){
      symbols.sort((a, b) => b.likes - a.likes);
    }
  }

  export function loadAnalysis(data){
    return {type: Action.LoadAnalysis, payload: data};
  }
  export function showAnalysis(analysis){
    return {type: Action.ShowAnalysis, payload: analysis};
  }
  export function showProgress() {
    return {type: Action.StartedWaiting};
  }
  export function like(memory){
    return{ type: Action.Like, payload: memory};
  }
  export function hideProgress() {
    return {type: Action.StoppedWaiting};
  }
  export function removeAnalysis(id) {
    return {type: Action.RemoveAnalysis, payload: id};
  }
  export function addAnalysis(analysis){
    return {type: Action.AddAnalysis, payload: analysis};
  }
  export function edit(symbol_object){
    return{ type: Action.Edit, payload:symbol_object};
  }
  export function sort(){
    return{ type: Action.Sort}
  }
  export function fetchAnalysis(symbol, id){
    return dispatch => {
      fetch(`https://project2.erdmannk.xyz:8443/${symbol}/${id}`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(showAnalysis(data.results));
        } else {
          console.error(data);
        }
      });
  };

}