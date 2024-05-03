import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './components/posts/postsSlice';
import postSlice from './components/post/postSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    post: postSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
