import React, { useEffect } from 'react';
import { fetchPosts } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './interfaces';
import { RootState } from '../../store';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';

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
      <List>
        {posts.map((post: Post) => (
          <ListItem key={post.id}>
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
