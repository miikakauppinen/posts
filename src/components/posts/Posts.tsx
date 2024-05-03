import React, { useEffect } from 'react';
import { fetchPosts } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './interfaces';
import { RootState } from '../../store';

const PostsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const {posts, status, error} = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts() as any);
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
