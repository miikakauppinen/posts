import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  } from 'react-router-dom';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
