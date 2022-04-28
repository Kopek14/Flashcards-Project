import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './reducerFolder';
import userReducer from './reducerSets';
import tokenReducer from './reducerToken';

export default configureStore({
  reducer: {
    user: userReducer,
    jwtToken: tokenReducer,
    folder: folderReducer,
  },
});
