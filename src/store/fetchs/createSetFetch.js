import { createAsyncThunk } from '@reduxjs/toolkit';

const createSetFetch = createAsyncThunk(
  'createSetFetch',
  async (setData, thunkApi) => {
    try {
      const { user } = thunkApi.getState();

      if (user.isPending && user.requestId !== thunkApi.requestId) {
        return;
      }

      const flashcardArray = await Promise.all(
        setData.flashcards.map(async item => {
          return new Promise((resolve, reject) => {
            fetch('/api/createFlashcard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
              },
              body: JSON.stringify(item),
            })
              .then(res => res.json())
              .then(res => resolve(res));
          });
        })
      );

      const response = new Promise((resolve, reject) => {
        fetch('/api/createSet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
          },
          body: JSON.stringify({
            ...setData,
            flashcards: flashcardArray.map(flashcardItem => flashcardItem._id),
          }),
        })
          .then(res => res.json())
          .then(createdSet => {
            resolve({
              ...createdSet,
              flashcards: flashcardArray,
            });
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });

      return response;
    } catch (err) {
      console.log(err);
      thunkApi.rejectWithValue(err.message);
    }
  }
);

export default createSetFetch;
