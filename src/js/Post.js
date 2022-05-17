import './css/Post.css';
import {useDispatch} from 'react-redux';
import {newAnalysis} from './actions';
import {useState} from 'react';
import {Link} from 'react-router-dom';

export function Post(){
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState('');
  const [price_target, setPriceTarget] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [username, setUsername] = useState('');
    return (
      <div id="post_container">
        <div id="top_container">
      <label> Symbol <br/>
        <textarea type="text" id="symbol" name="symbol" size="5" value={symbol} onChange={event => setSymbol(event.target.value.toUpperCase())}/>
      </label>
  <label className="price_label"> Price Target <br/>
  <input type="number" className="class_label" name="price_target" value={price_target} onChange={event => setPriceTarget(event.target.value)}/><br />
  </label>
  </div>
  <label > Username<br/>
  <textarea type="text" name="username" value={username} onChange={event => setUsername(event.target.value)}/><br />
  </label>
  <label> Title<br />
  <textarea type="text" id="title" name="title" size="70" value={title} onChange={event => setTitle(event.target.value)} /><br />
  </label>
  <label> Analysis<br />
  <textarea type="text" className="analysis" name="analysis" size="5000" height="400"value={post} onChange={event => setPost(event.target.value)}/>
  </label>
  <Link to={`/newpost/successful`}><button id="submit_button" onClick={() => dispatch(newAnalysis(symbol, parseInt(price_target), title, post, username))}>Submit</button></Link>
      </div>
    );
}