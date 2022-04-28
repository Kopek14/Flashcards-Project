import { createAsyncThunk } from '@reduxjs/toolkit';

const addSetToFolder = createAsyncThunk(
  'addSetToFolder',
  async (folderData, thunkApi) => {
    try {
      const { folder } = thunkApi.getState();

      if (folder.isPending && folder.requestId !== thunkApi.requestId) {
        return;
      }

      const response = await fetch('/api/editFolder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(folderData),
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err);
    }
  }
);

export default addSetToFolder;
