import { createAsyncThunk } from '@reduxjs/toolkit';

const getFoldersFetch = createAsyncThunk(
  'getFoldersFetch',
  async (noNeed, thunkApi) => {
    try {
      const { folder } = thunkApi.getState();

      if (folder.isPending && folder.requestId !== thunkApi.requestId) {
        return;
      }

      const response = await fetch('/api/getUserFolders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err);
    }
  }
);

export default getFoldersFetch;
