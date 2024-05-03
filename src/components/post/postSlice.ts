import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../interfaces';

interface PostState {
  post: Post | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostState = {
  post: null,
  status: 'idle',
  error: null
};

export const fetchPost = createAsyncThunk(
  'post/fetchPost',
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      return response.json();
    } catch (err) {
      return rejectWithValue('Failed to fetch post');
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload;  // Set the fetched post
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default postSlice.reducer;
