import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserSets = createAsyncThunk(
  'fetchUserSets',
  async (noNeed = {}, thunkApi) => {
    try {
      const { user } = thunkApi.getState();

      if (user.isPending && user.requestId !== thunkApi.requestId) {
        return;
      }

      const response = await fetch('/api/getUserSets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);
