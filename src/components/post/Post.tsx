import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from './postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { StyledContainer } from '../StyledComponents';
import styled from 'styled-components';

const StyledPostCard = styled.div`
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const PostComponent: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { post, status, error } = useSelector((state: RootState) => state.post);
  const { posts } = useSelector((state: RootState) => state.posts);
  const [statePost, setStatePost] = useState(posts.find(({id}) => id === Number(postId)))

  useEffect(() => {
    if (!statePost && postId) {
      dispatch(fetchPost(Number(postId)));
      //@ts-ignore
      setStatePost(post)
    }
  }, [statePost, post, postId, dispatch]);

  return (
    <StyledContainer>
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {statePost && (
        <StyledPostCard>
          <h1>{statePost.title}</h1>
          <p>{statePost.body}</p>
        </StyledPostCard>
      )}
    </StyledContainer>
  );
}

export default PostComponent;
