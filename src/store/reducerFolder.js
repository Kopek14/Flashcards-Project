import { createSlice } from '@reduxjs/toolkit';
import addFolderFetch from './fetchs/folderFetchs/addFolderFetch';
import addSetToFolder from './fetchs/folderFetchs/addSetToFolderFetch';
import getFoldersFetch from './fetchs/folderFetchs/getFoldersFetch';

const folderReducer = createSlice({
  name: 'folder',
  initialState: {
    folders: [],
    requestId: null,
    isPending: false,
    error: null,
  },
  extraReducers: builder => {
    //create folder
    builder
      .addCase(addFolderFetch.pending, (state, { meta }) => {
        if (state.isPending) {
          return;
        }
        state.requestId = meta.requestId;
        state.isPending = true;
      })
      .addCase(addFolderFetch.fulfilled, (state, { payload }) => {
        state.requestId = null;
        state.isPending = false;
        state.folders = [...state.folders, payload.createdFolder];
      })
      .addCase(addFolderFetch.rejected, (state, { error }) => {
        state.requestId = null;
        state.isPending = false;
        state.error = error;
      });
    //Get user's folders
    builder
      .addCase(getFoldersFetch.pending, (state, { meta }) => {
        if (state.isPending) {
          return;
        }
        state.requestId = meta.requestId;
        state.isPending = true;
      })
      .addCase(getFoldersFetch.fulfilled, (state, { payload }) => {
        state.requestId = null;
        state.isPending = false;
        state.folders = payload;
      })
      .addCase(getFoldersFetch.rejected, (state, { error }) => {
        state.requestId = null;
        state.isPending = false;
        state.error = error;
      });
    builder
      .addCase(addSetToFolder.pending, (state, { meta }) => {
        if (state.isPending) {
          return;
        }
        state.requestId = meta.requestId;
        state.isPending = true;
      })
      .addCase(addSetToFolder.fulfilled, (state, { payload }) => {
        state.requestId = null;
        state.isPending = false;
        state.folders = [
          ...state.folders.map(folder => {
            if (folder._id === payload._id) {
              return payload;
            }
            return folder;
          }),
        ];
      })
      .addCase(addSetToFolder.rejected, (state, { error }) => {
        state.requestId = null;
        state.isPending = false;
        state.error = error;
      });
  },
});

export default folderReducer.reducer;
