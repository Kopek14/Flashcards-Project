import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVerifyToken = createAsyncThunk(
  'fetchVerifyToken',
  async (jwtToken, thunkApi) => {
    try {
      const response = await fetch('/api/verifyToken', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);
