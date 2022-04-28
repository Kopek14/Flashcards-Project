import { createAsyncThunk } from '@reduxjs/toolkit';

export const editFlashcardFetch = createAsyncThunk(
  'editFlashcard',
  async (flashcard, thunkApi) => {
    try {
      const { user } = thunkApi.getState();

      if (user.isPending && user.requestId !== thunkApi.requestId) {
        return;
      }
      console.log('flashcard:', flashcard);
      const response = await fetch('/api/editFlashcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(flashcard),
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);
