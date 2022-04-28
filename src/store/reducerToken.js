import { createSlice } from '@reduxjs/toolkit';
import { fetchVerifyToken } from './fetchs/fetchVerifyToken';
import { tokenFetch } from './fetchs/tokenFetch';

const reducerToken = createSlice({
  name: 'jwtToken',
  initialState: {
    jwtToken: null,
    isPending: false,
    requestId: null,
    refreshWebsite: true,
    successfulLogin: sessionStorage.getItem('userToken') ? true : false,
  },
  reducers: {
    loadUserFromToken: (state, action) => {
      const jwtToken = sessionStorage.getItem('jwtToken');
      if (!jwtToken || jwtToken === '') {
        return;
      }
    },
    setJwtToken: (state, { payload }) => {
      state.jwtToken = payload;
      state.successfulLogin = false;
    },
  },
  extraReducers: builder => {
    //Fetch jwt token
    builder
      .addCase(tokenFetch.pending, (state, { meta }) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = meta.requestId;
        state.successfulLogin = false;
      })
      .addCase(tokenFetch.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        sessionStorage.setItem('userToken', payload.token);
        state.jwtToken = payload.token;
        state.successfulLogin = true;
      })
      .addCase(tokenFetch.rejected, (state, { error }) => {
        sessionStorage.removeItem('userToken');
        state.error = error;
        state.isPending = null;
        state.requestId = null;
        state.successfulLogin = false;
      });

    //Fetch valid token after refresh website
    builder
      .addCase(fetchVerifyToken.pending, (state, { meta }) => {
        state.isPending = true;
        state.requestId = meta.requestId;
        state.successfulLogin = true;
      })
      .addCase(fetchVerifyToken.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        state.refreshWebsite = false;
        state.jwtToken = sessionStorage.getItem('userToken');
        state.successfulLogin = true;
      })
      .addCase(fetchVerifyToken.rejected, (state, { error }) => {
        state.error = error;
        state.isPending = null;
        state.requestId = null;
        state.refreshWebsite = false;
        state.successfulLogin = false;
      });
  },
});

export const { setJwtToken } = reducerToken.actions;
export default reducerToken.reducer;
