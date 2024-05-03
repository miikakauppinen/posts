import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from './postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const PostComponent: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { post, status, error } = useSelector((state: RootState) => state.post);
  const {posts} = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(Number(postId)));
    }
  }, [postId, dispatch]);

  //@ts-ignore
  //Use locally created post if no post found because jsonplaceholder doesnt actually create one
  const localPost = Object.keys(post).length ? post : posts.find(({id}) => id === Number(postId));

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {localPost && (
        <div>
          <h1>{localPost.title}</h1>
          <p>{localPost.body}</p>
        </div>
      )}
    </div>
  );
}

export default PostComponent;
