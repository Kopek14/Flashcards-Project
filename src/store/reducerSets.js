import { createSlice } from '@reduxjs/toolkit';
import createSetFetch from './fetchs/createSetFetch';
import { editFlashcardFetch } from './fetchs/editFlashcardFetch';
import editSetFetch from './fetchs/editSetFetch';
import removeSetFetch from './fetchs/removeSetFetch';
import { fetchUserSets } from './fetchs/userFetch';

const defaultState = {
  user: {
    email: '',
    name: '',
  },
  sets: [],
  folders: [],
  requestId: null,
  isPending: false,
  navigateSetId: '',
  tokenJWT: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    addSets: (state, { payload }) => {
      state.sets = payload;
    },
    setNavigateSetId: (state, { payload }) => {
      state.navigateSetId = '';
    },
  },
  extraReducers: builder => {
    //Download Sets from DB
    builder
      .addCase(fetchUserSets.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchUserSets.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        state.sets = payload;
      })
      .addCase(fetchUserSets.rejected, (state, { error }) => {
        state.error = error;
        state.isPending = false;
        state.requestId = null;
      });
    //Fast edit flashcard
    builder
      .addCase(editFlashcardFetch.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
        state.navigateSetId = '';
      })
      .addCase(editFlashcardFetch.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        console.log(payload, 'payload w editDFlashcardFetch');
        state.navigateSetId = payload._id;
        state.sets = state.sets.map(set => {
          return {
            ...set,
            flashcards: set.flashcards.map(flashcard => {
              if (flashcard._id === payload._id) {
                return payload;
              }
              return flashcard;
            }),
          };
        });
      })
      .addCase(editFlashcardFetch.rejected, (state, { error }) => {
        state.error = error;
        state.isPending = false;
        state.requestId = null;
        state.navigateSetId = '';
      });
    //Add new set
    builder
      .addCase(createSetFetch.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(createSetFetch.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        state.navigateSetId = payload._id;
        state.sets.push(payload);
      })
      .addCase(createSetFetch.rejected, (state, { error }) => {
        state.error = error;
        state.isPending = false;
        state.requestId = null;
      });
    //edit set
    builder
      .addCase(editSetFetch.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(editSetFetch.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        state.navigateSetId = payload._id;
        state.sets = state.sets.map(set => {
          if (set._id !== payload._id) {
            return set;
          }
          return {
            ...payload,
            flashcards: payload.flashcards,
          };
        });
      })
      .addCase(editSetFetch.rejected, (state, { error }) => {
        state.isPending = false;
        state.requestId = null;
        state.error = error;
      });
    //remove set
    builder
      .addCase(removeSetFetch.pending, (state, action) => {
        if (state.isPending) {
          return;
        }

        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(removeSetFetch.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.requestId = null;
        state.sets = state.sets.filter(set => set._id !== payload._id);
      })
      .addCase(removeSetFetch.rejected, (state, error) => {
        state.isPending = false;
        state.requestId = null;
        state.error = error;
      });
  },
});

export default userSlice.reducer;
export const { addSets, setNavigateSetId } = userSlice.actions;
