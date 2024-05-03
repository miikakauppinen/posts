import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from './postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

function PostComponent() {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { post, status, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(Number(postId)));
    }
  }, [postId, dispatch]);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
}

export default PostComponent;
