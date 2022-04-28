import { createAsyncThunk } from '@reduxjs/toolkit';

const removeSetFetch = createAsyncThunk(
  'removeFetch',
  async (setData, thunkApi) => {
    try {
      const { user } = thunkApi.getState();

      if (user.isPending && user.requestId !== thunkApi.requestId) {
        return;
      }

      const response = await fetch('/api/removeSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(setData),
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err);
    }
  }
);

export default removeSetFetch;
