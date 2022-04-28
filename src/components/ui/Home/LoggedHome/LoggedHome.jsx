import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import SetOfFlashcard from './SetOfFlashcard/SetOfFlashcard';
import Paper from '@mui/material/Paper';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSelector } from 'react-redux';
import FolderCard from './FolderCard/FolderCard';

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

    height: '100%',
    margin: 'auto',
    width: theme.breakpoints.values.lg,
    marginBottom: theme.spacing(4),
  },
  containerMarginTop: {
    marginTop: theme.spacing(18),
  },
  achievementProgress: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
  setOfFlashcard: {
    textDecoration: 'none !important',
  },
}));

const Achivement = ({ classes, disabled, color, week }) => {
  return (
    <Grid item xs={4}>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <EmojiEventsIcon
            sx={{
              fontSize: '6em',
              color: disabled ? '000' : color,
              opacity: disabled ? 0.6 : 1,
            }}
            className={classes.achievementIcon}
          />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: '1.2em' }}>{week} tydzień</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const LoggedHome = () => {
  const sets = useSelector(state => state.user.sets);
  const folders = useSelector(state => state.folder.folders);
  const classes = useStyles();
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      className={`${classes.container} ${classes.containerMarginTop}`}
    >
      <Grid item mb={2} xs={12}>
        <Typography variant='h6' className={classes.achievementProgress} ml={2}>
          Osiągnięcia
        </Typography>
      </Grid>
      <Grid component={Paper} mx={2} p={2} container item xs={12}>
        <Achivement
          classes={classes}
          theme={theme}
          color={theme.palette.common.bronze}
          disabled={true}
          week={1}
        />
        <Achivement
          classes={classes}
          theme={theme}
          color={theme.palette.common.silver}
          disabled={true}
          week={5}
        />
        <Achivement
          classes={classes}
          theme={theme}
          color={theme.palette.common.gold}
          disabled={true}
          week={20}
        />
      </Grid>
      <Grid ml={2} item pl={0} mt={4} xs={12}>
        <Typography variant='h6' className={classes.achievementProgress}>
          Zestawy
        </Typography>
      </Grid>
      <Grid container className={classes.container} spacing={2}>
        {sets
          ? sets.map(set => (
              <SetOfFlashcard
                classes={classes}
                mdMatches={mdMatches}
                key={set._id}
                set={set}
              />
            ))
          : undefined}
      </Grid>
      <Grid ml={2} item pl={0} mt={4} xs={12}>
        <Typography variant='h6' className={classes.achievementProgress} mb={2}>
          Foldery
        </Typography>
      </Grid>
      <Grid container className={classes.container} gap={2}>
        {folders.map(folder => (
          <FolderCard
            key={folder._id}
            nameFolder={folder.title}
            amountFolder={folder.sets.length}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default LoggedHome;
