import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Paper, Grid, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import { editFlashcardFetch } from '../../../../store/fetchs/editFlashcardFetch';

const Flashcard = ({
  flashcard: { _id, term, definition, user, star },
  useStyles,
  matchesMd,
  setSetData,
}) => {
  const classes = useStyles();
  const [flashcardData, setFlashcardData] = useState({
    term,
    definition,
    star,
  });
  const [availableEdit, setAvailableEdit] = useState(false);
  const dispatch = useDispatch();

  const handleChangeFlashcard = e =>
    setFlashcardData({ ...flashcardData, [e.target.name]: e.target.value });

  useEffect(() => {
    let mounted = true;

    if (availableEdit) {
      return;
    }
    if (
      (flashcardData.term !== '' && flashcardData.term !== term) ||
      (flashcardData.definition !== '' &&
        flashcardData.definition !== definition &&
        mounted)
    ) {
      dispatch(editFlashcardFetch({ ...flashcardData, _id, user }));
      setSetData(state => {
        return {
          ...state,
          flashcards: [
            ...state.flashcards.map(flashcard => {
              if (flashcard._id === _id) {
                return {
                  ...flashcardData,
                  user,
                  star,
                  _id,
                };
              }
              return flashcard;
            }),
          ],
        };
      });
    }
    return () => {
      mounted = false;
    };
  }, [
    flashcardData,
    availableEdit,
    _id,
    user,
    dispatch,
    definition,
    term,
    setSetData,
    star,
  ]);

  const handleChangeStar = () => {
    setFlashcardData({ ...flashcardData, star: !flashcardData.star });
    dispatch(editFlashcardFetch({ ...flashcardData, _id, user, star: !star }));
  };

  return (
    <Paper className={classes.flashcard} elevation={2}>
      <Grid container direction={matchesMd ? 'column' : 'row'}>
        <Grid
          order={{ xs: 2, md: 1 }}
          item
          container
          alignItems='center'
          xs={5}
        >
          {availableEdit ? (
            <TextField
              variant='standard'
              label='Term'
              name='term'
              value={flashcardData.term}
              onChange={handleChangeFlashcard}
            />
          ) : (
            <span className={classes.flashcardSpan}>{flashcardData.term}</span>
          )}
        </Grid>
        <Grid
          mt={matchesMd ? 2 : 0}
          order={{ xs: 3, md: 2 }}
          item
          container
          alignItems='center'
          xs={5}
        >
          {availableEdit ? (
            <TextField
              variant='standard'
              label='Definition'
              name='definition'
              value={flashcardData.definition}
              onChange={handleChangeFlashcard}
            />
          ) : (
            <span className={classes.flashcardSpan}>
              {flashcardData.definition}
            </span>
          )}
        </Grid>
        <Grid
          order={{ xs: 1, md: 3 }}
          item
          xs={2}
          container
          justifyContent='flex-end'
        >
          <Grid
            item
            xs={1}
            md={4}
            container
            alignItems='center'
            justifyContent='flex-end'
          >
            <IconButton
              color={flashcardData.star ? 'secondary' : 'default'}
              onClick={handleChangeStar}
            >
              <StarIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={1}
            md={4}
            container
            alignItems='center'
            justifyContent='flex-end'
          >
            <IconButton onClick={() => setAvailableEdit(!availableEdit)}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Flashcard;
