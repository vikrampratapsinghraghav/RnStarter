import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../api/types';
import { postsApi } from '../../api';
import { API_BASE_URL } from '../../api/config';

// Action Types
export const POST_ACTIONS = {
  SET_FILTER: 'posts/setFilter',
  SET_SORT_BY: 'posts/setSortBy',
  SET_SORT_ORDER: 'posts/setSortOrder',
  TOGGLE_FAVORITE: 'posts/toggleFavorite',
  SET_PAGE: 'posts/setPage',
  SET_ITEMS_PER_PAGE: 'posts/setItemsPerPage',
} as const;

// Sync Actions
export const setFilter = createAction<string>(POST_ACTIONS.SET_FILTER);
export const setSortBy = createAction<'title' | 'id'>(POST_ACTIONS.SET_SORT_BY);
export const setSortOrder = createAction<'asc' | 'desc'>(POST_ACTIONS.SET_SORT_ORDER);
export const toggleFavorite = createAction<number>(POST_ACTIONS.TOGGLE_FAVORITE);
export const setPage = createAction<number>(POST_ACTIONS.SET_PAGE);
export const setItemsPerPage = createAction<number>(POST_ACTIONS.SET_ITEMS_PER_PAGE);

// Async Thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    return await postsApi.getAllPosts();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch posts');
  }
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: Omit<Post, 'id'>, { rejectWithValue }) => {
    try {
      return await postsApi.createPost(post);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create post');
    }
  },
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, post }: { id: number; post: Partial<Post> }, { rejectWithValue }) => {
    try {
      return await postsApi.updatePost(id, post);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update post');
    }
  },
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
  },
);

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
  },
);
