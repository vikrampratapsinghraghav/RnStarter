import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../api/types';
import { postsApi } from '../../api';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await postsApi.getAllPosts();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: Omit<Post, 'id'>, { rejectWithValue }) => {
    try {
      return await postsApi.createPost(post);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, post }: { id: number; post: Partial<Post> }, { rejectWithValue }) => {
    try {
      return await postsApi.updatePost(id, post);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      await postsApi.deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Something went wrong';
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload);
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer; 