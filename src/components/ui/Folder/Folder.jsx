import { Grid, IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.breakpoints.values.sm,
    },
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg,
    },
    marginTop: `${theme.spacing(18)}`,
    height: '100%',
    margin: 'auto',
    width: theme.breakpoints.values.lg,
    marginBottom: theme.spacing(4),
  },
  setsCount: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
  createdBy: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.5)',
    '& span': {
      color: 'black',
    },
  },
}));

const Folder = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid container item justifyContent='space-between'>
        <Grid container item xs={3}>
          <Grid item component='p' className={classes.setsCount}>
            2 zestawy
          </Grid>
          <Grid ml={4} component='p' item className={classes.createdBy}>
            created by: <span>kopek</span>
          </Grid>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title='Dodaj zestaw'>
            <IconButton size='large' color='primary'>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Edytuj folder'>
            <IconButton color='primary' size='large'>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Usuń folder'>
            <IconButton size='large' color='primary'>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Folder;
