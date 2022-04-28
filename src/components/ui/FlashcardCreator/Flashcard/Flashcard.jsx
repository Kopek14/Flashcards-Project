import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Flashcard = ({
  classes,
  onchange,
  index,
  deleteItem,
  matchesLg,
  matchesMd,
  setRemoveFlashcard,
  ...props
}) => {
  const [data, setData] = useState({
    term: props.term || '',
    definition: props.definition || '',
  });

  const onChangeInput = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <Grid item container mt={4} direction='column'>
      <Grid item>
        <Paper elevation={3}>
          <Paper elevation={1}>
            <Grid
              container
              className={classes.flashcardContainer}
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid item>
                <Typography>{props.item}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => deleteItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          <Grid
            container
            spacing={matchesLg ? 8 : matchesMd ? 5 : 3}
            className={classes.flashcardContainerBottom}
            justifyContent='space-between'
          >
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                type='text'
                fullWidth
                variant='outlined'
                label='Słowo'
                name='term'
                size='small'
                value={data.term}
                onChange={e => {
                  onChangeInput(e);
                  onchange(e, index);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                type='text'
                fullWidth
                label='Definicja'
                variant='outlined'
                name='definition'
                size='small'
                value={data.definition}
                onChange={e => {
                  onChangeInput(e);
                  onchange(e, index);
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Flashcard;
