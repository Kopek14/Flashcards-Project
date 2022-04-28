import { createAsyncThunk } from '@reduxjs/toolkit';

export const tokenFetch = createAsyncThunk(
  'tokenFetch',
  async (formDataLog, thunkApi) => {
    try {
      const tokenSession = sessionStorage.getItem('jwtToken');
      if (tokenSession && tokenSession !== '') {
        return;
      }

      const { jwtToken } = thunkApi.getState();
      if (jwtToken.isPending && jwtToken.requestId !== thunkApi.requestId) {
        return;
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataLog),
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);
