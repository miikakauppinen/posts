import React, { useEffect, useState } from 'react';
import { fetchPosts, removePost, addPost } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../interfaces';
import { AppDispatch, RootState } from '../../store';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import styled from 'styled-components';
import { StyledContainer } from '../StyledComponents';
import AddNewPostModal from './AddNewPostModal';

const StyledList = styled(List)`
  width: 50%;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledDeleteIcon = styled(Delete)`
  margin: 0.5rem;
  cursor: pointer;
`

const PostsComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, status, error} = useSelector((state: RootState) => state.posts);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleRemovePost = (id: number) => {
    dispatch(removePost(id));
  };

  const handleAddPost = () => {
    const payload = {
      userId: 1,
      title: postTitle,
      body: postBody,
    }

    dispatch(addPost(payload));
    setPostTitle('');
    setPostBody('');
    setModalOpen(false);
  };

  return (
    <StyledContainer>
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <Button onClick={() => setModalOpen(true)}>Add post</Button>
      <StyledList>
        {posts.map((post: Post) => (
          <ListItem key={post.id}>
            <ListItemButton component={Link} to={`/posts/${post.id}`}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={post.title} />
            </ListItemButton>
            <ListItemIcon onClick={() => handleRemovePost(post.id)}>
              <StyledDeleteIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </StyledList>
      {modalOpen && 
        <AddNewPostModal 
          modalOpen={modalOpen} 
          handleClose={() => setModalOpen(false)} 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          onConfirm={handleAddPost}
        />
      }
    </StyledContainer>
  );
}

export default PostsComponent;
