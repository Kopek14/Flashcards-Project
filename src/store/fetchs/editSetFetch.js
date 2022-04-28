import { createAsyncThunk } from '@reduxjs/toolkit';

const editSetFetch = createAsyncThunk(
  'editSetFetch',
  async ({ setData, flashcardsToRemove }, thunkApi) => {
    try {
      const { user } = thunkApi.getState();

      if (user.isPending && user.requestId !== thunkApi.requestId) {
        return;
      }

      if (flashcardsToRemove.length !== 0) {
        flashcardsToRemove.forEach(flashcardToRemove => {
          fetch('/api/removeFlashcard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            },
            body: JSON.stringify(flashcardToRemove),
          })
            .then(res => res.json())
            .then(res => console.log('Usunieta fiszka: ', res))
            .catch(err => console.log('Błąd usunięcia fiszki: ', err));
        });
      }

      const arrayFlashcardsResp = await Promise.all(
        setData.flashcards.map(flashcard => {
          return new Promise((resolve, reject) => {
            fetch(
              `/api/${!flashcard._id ? 'createFlashcard' : 'editFlashcard'}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${sessionStorage.getItem(
                    'userToken'
                  )}`,
                },
                body: JSON.stringify(flashcard),
              }
            )
              .then(res => res.json())
              .then(res => resolve(res))
              .catch(err => reject(err));
          });
        })
      );

      const response = await fetch('/api/editSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({
          ...setData,
          user: setData.user,
          flashcards: [...arrayFlashcardsResp],
        }),
      });

      return response.json();
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);

export default editSetFetch;
