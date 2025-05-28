import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../api/types';
import { postsApi } from '../../api';
import { API_BASE_URL } from '../../api/config';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  filter: string;
  sortBy: 'title' | 'id';
  sortOrder: 'asc' | 'desc';
  favorites: number[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  filter: '',
  sortBy: 'id',
  sortOrder: 'desc',
  favorites: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  },
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

// New async thunk for paginated fetch
export const fetchPaginatedPosts = createAsyncThunk(
  'posts/fetchPaginatedPosts',
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const start = (page - 1) * limit;
      const response = await fetch(`${API_BASE_URL}/posts?_start=${start}&_limit=${limit}`);
      const data = await response.json();
      const total = parseInt(response.headers.get('x-total-count') || '0', 10);
      return { posts: data, total };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch posts');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'title' | 'id'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const index = state.favorites.indexOf(postId);
      if (index === -1) {
        state.favorites.push(postId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page when changing items per page
    },
  },
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
      })
      // Paginated fetch cases
      .addCase(fetchPaginatedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedPosts.fulfilled, (state, action: PayloadAction<{ posts: Post[]; total: number }>) => {
        state.loading = false;
        state.items = action.payload.posts;
        state.pagination.totalItems = action.payload.total;
      })
      .addCase(fetchPaginatedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Something went wrong';
      });
  },
});

export const {
  setFilter,
  setSortBy,
  setSortOrder,
  toggleFavorite,
  setPage,
  setItemsPerPage,
} = postsSlice.actions;

// Selectors
export const selectFilteredAndSortedPosts = (state: { posts: PostsState }) => {
  const { items, filter, sortBy, sortOrder } = state.posts;
  
  let filteredPosts = items;
  if (filter) {
    filteredPosts = items.filter(post => 
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.body.toLowerCase().includes(filter.toLowerCase())
    );
  }
  
  return [...filteredPosts].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const selectFavoriteStatus = (postId: number) => (state: { posts: PostsState }) => 
  state.posts.favorites.includes(postId);

export const selectPaginationInfo = (state: { posts: PostsState }) => state.posts.pagination;

export default postsSlice.reducer; 