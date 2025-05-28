import { API_BASE_URL, DEFAULT_HEADERS, handleApiResponse } from '../config';
import { Post, Comment } from '../types';

export const postsApi = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    return handleApiResponse<Post[]>(response);
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    return handleApiResponse<Post>(response);
  },

  getPostComments: async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    return handleApiResponse<Comment[]>(response);
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(post),
    });
    return handleApiResponse<Post>(response);
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(post),
    });
    return handleApiResponse<Post>(response);
  },

  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: DEFAULT_HEADERS,
    });
    return handleApiResponse<void>(response);
  },
};
