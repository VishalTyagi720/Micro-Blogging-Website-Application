import { createContext } from 'react';

import { useProvidePosts } from '../hooks';

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const Posts = useProvidePosts();

  return (
    <PostsContext.Provider value={Posts}>{children}</PostsContext.Provider>
  );
};
