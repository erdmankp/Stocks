import './css/App.css';
import {Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Home} from './Home';
import {Header} from './Header';
import {Analysis} from './Analysis';
import {Post} from './Post';
import {Profile} from './Profile';
import {downloadAnalysis} from './actions';
import {Search} from './Search'
import {Edit} from './Edit';
import {Message} from './Message';

function App() {
  const isWaiting = useSelector((state) => state.isWaiting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(downloadAnalysis());
  }, [dispatch]);
  
  return (
    <div className="App">
      {isWaiting && <div id="progress-indicator" />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:symbol/:id" element={<Analysis />} />
        <Route path="/newpost" element={<Post />} />
        <Route path="/newpost/successful" element={<Message />} />
        <Route path="/user/:username" element={<Profile />}/>
        <Route path="/search/:symbol" element={<Search />}/>
        <Route path="/new" element={<Home />} />
        <Route path="/top" element={<Home />} />
        <Route path="/:symbol/:id/edit" element={<Edit />} />
      </Routes>
      </div>
  )
}

export default App;
