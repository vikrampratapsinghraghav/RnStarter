import { createReducer } from '@reduxjs/toolkit';
import { Post } from '../../api/types';
import {
  POST_ACTIONS,
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  fetchPaginatedPosts,
  setFilter,
  setSortBy,
  setSortOrder,
  toggleFavorite,
  setPage,
  setItemsPerPage,
} from '../actions/posts.actions';

export interface PostsState {
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

export const postsReducer = createReducer(initialState, builder => {
  builder
    // Handle sync actions
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(setSortBy, (state, action) => {
      state.sortBy = action.payload;
    })
    .addCase(setSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(toggleFavorite, (state, action) => {
      const postId = action.payload;
      const index = state.favorites.indexOf(postId);
      if (index === -1) {
        state.favorites.push(postId);
      } else {
        state.favorites.splice(index, 1);
      }
    })
    .addCase(setPage, (state, action) => {
      state.pagination.currentPage = action.payload;
    })
    .addCase(setItemsPerPage, (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page when changing items per page
    })
    // Handle async thunks
    .addCase(fetchPosts.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Something went wrong';
    })
    .addCase(createPost.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      const index = state.items.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    })
    .addCase(fetchPaginatedPosts.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPaginatedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.posts;
      state.pagination.totalItems = action.payload.total;
    })
    .addCase(fetchPaginatedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Something went wrong';
    });
});

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