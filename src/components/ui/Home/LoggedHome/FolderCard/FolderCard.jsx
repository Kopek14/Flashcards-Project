import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const FolderCard = ({ nameFolder, amountFolder }) => {
  return (
    <Paper elevation={3} sx={{}} p={2} component={Grid} mx={2} container>
      <Grid item container sx={{ width: 'auto' }} direction='column' mr={4}>
        <Grid item>
          <Typography
            variant='span'
            sx={{ fontSize: '1.3em', fontWeight: 'bold' }}
          >
            {amountFolder} zestawy
          </Typography>
        </Grid>
        <Grid item>
          <FolderOpenIcon sx={{ fontSize: '2em', color: 'gray' }} />
        </Grid>
      </Grid>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{ fontSize: '1.6em', fontWeight: 400, fontFamily: 'Raleway' }}
        >
          {nameFolder}
        </Typography>
      </Grid>
    </Paper>
  );
};

export default FolderCard;
