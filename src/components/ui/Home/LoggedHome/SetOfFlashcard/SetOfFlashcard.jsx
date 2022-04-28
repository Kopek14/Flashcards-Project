import React from 'react';

import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

const SetOfFlashcard = ({ set, mdMatches, classes }) => {
  return (
    <Grid
      className={classes.setOfFlashcard}
      component={Link}
      to={`/flashcard/${set._id}`}
      item
      xs={12}
      md={6}
      lg={4}
      sx={{
        paddingRight: mdMatches ? 2 : 0,
        paddingLeft: 0,
      }}
    >
      <Card elevation={4}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {set.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {set.flashcards.length} fiszki
          </Typography>
        </CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='creator'>
              K
            </Avatar>
          }
          title='Kopek'
        />
      </Card>
    </Grid>
  );
};

export default SetOfFlashcard;
