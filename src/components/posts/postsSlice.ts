import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../interfaces';

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (payload: unknown, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', 
        body: JSON.stringify(payload), 
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },});
      return response.json();
    } catch (err) {
      return rejectWithValue('Failed to add post');
    }
  }
);


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : 'Something went wrong';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  }
});

export const { removePost } = postsSlice.actions;
export default postsSlice.reducer;
