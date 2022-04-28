import React, { useState } from 'react';

import { Grid, Paper, Button, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactCardFlip from 'react-card-flip';
import { useTheme } from '@emotion/react';

const CardFlip = ({ flashcards, classes }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [indexCardFlip, setIndexCardFlip] = useState(0);
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleFlashcardFlipped = () => setIsFlipped(!isFlipped);

  const handleChangeFlashcardRight = number => {
    setOpacity(0);
    setTimeout(() => {
      indexCardFlip === flashcards.length - 1
        ? setIndexCardFlip(0)
        : setIndexCardFlip(indexCardFlip + 1);
      setOpacity(1);
    }, 500);
  };

  const handleChangeFlashcardLeft = number => {
    setOpacity(0);
    setTimeout(() => {
      indexCardFlip === 0
        ? setIndexCardFlip(flashcards.length - 1)
        : setIndexCardFlip(indexCardFlip - 1);
      setOpacity(1);
    }, 500);
  };

  return (
    <>
      <Grid
        container
        item
        justifyContent='center'
        sx={{
          opacity: opacity,
          transition: 'all 0.5s ease',
        }}
        xs={12}
      >
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection='vertical'
          containerStyle={{
            width: matchesMd ? '35em' : '100%',
          }}
        >
          <Paper className={classes.paper} elevation={8}>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Button
                sx={{
                  width: '100%',
                  height: '100%',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
                className={classes.flashcardSpanMax}
                disableRipple
                onClick={handleFlashcardFlipped}
              >
                {flashcards[indexCardFlip].term}
              </Button>
            </Grid>
          </Paper>
          <Paper className={classes.paper} elevation={8}>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Button
                sx={{
                  width: '100%',
                  height: '100%',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
                className={classes.flashcardSpanMax}
                disableRipple
                onClick={handleFlashcardFlipped}
              >
                {flashcards[indexCardFlip].definition}
              </Button>
            </Grid>
          </Paper>
        </ReactCardFlip>
      </Grid>
      <Grid mt={2} item container justifyContent='center' xs={12}>
        <Grid container item justifyContent='center' xs={1}>
          <ArrowBackIcon onClick={handleChangeFlashcardLeft} color='primary' />
        </Grid>
        <Grid item container justifyContent='center' xs={1}>
          <span>
            {indexCardFlip + 1}/{flashcards.length}
          </span>
        </Grid>
        <Grid item container justifyContent='center' xs={1}>
          <ArrowForwardIcon
            onClick={handleChangeFlashcardRight}
            color='primary'
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardFlip;
