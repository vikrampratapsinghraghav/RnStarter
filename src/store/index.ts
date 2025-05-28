import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './reducers/posts.reducer';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 