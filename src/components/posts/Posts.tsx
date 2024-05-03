import React, { useEffect } from 'react';
import { fetchPosts } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../interfaces';
import { AppDispatch, RootState } from '../../store';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Link } from 'react-router-dom';

const PostsComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, status, error} = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <List>
        {posts.map((post: Post) => (
          <ListItem key={post.id} component={Link} to={`/posts/${post.id}`}>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={post.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default PostsComponent;
