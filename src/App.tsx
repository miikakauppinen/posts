import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  } from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/posts/Posts';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
