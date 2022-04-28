import { createAsyncThunk } from '@reduxjs/toolkit';

const addFolderFetch = createAsyncThunk(
  'addFolderFetch',
  async (folderData, thunkApi) => {
    try {
      const { folder } = thunkApi.getState();

      if (folder.isPending && folder.requestId !== thunkApi.requestId) {
        return;
      }

      const response = await fetch('/api/createFolder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(folderData),
      });

      return response.json();
    } catch (error) {
      console.log(error);
      thunkApi.rejectWithValue(error);
    }
  }
);

export default addFolderFetch;
