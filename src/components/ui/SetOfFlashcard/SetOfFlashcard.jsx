import React, { useEffect, useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, Navigate, useParams } from 'react-router-dom';

import CardFlip from './CardFlip';
import Flashcard from './Flashcard/Flashcard';

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import {
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
  Backdrop,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import AddToFolderModal from './AddToFolderModal/AddToFolderModal';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import CreateIcon from '@mui/icons-material/Create';
import QuizIcon from '@mui/icons-material/Quiz';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import removeSetFetch from '../../../store/fetchs/removeSetFetch';

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

    position: 'relative',
    height: '100%',
    margin: 'auto',
    width: theme.breakpoints.values.lg,
    marginBottom: theme.spacing(4),
  },
  h4: {
    fontSize: '5em',
    fontFamily: 'Neonderthaw, cursive',
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  paper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    height: '18em',
    width: '90%',
    [theme.breakpoints.up('md')]: '35em',
  },
  flashcardSpanMax: {
    fontSize: '2.5em',
    color: 'rgba(0,0,0,.7)',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5em',
    },
  },
  menuList: {
    '& li + li': {
      marginTop: theme.spacing(2),
    },
  },
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.common.orange,
    },
  },
  listItemText: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
  listItemIcon: {
    fontSize: '1.9em',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: '.7em',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  userText: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
  flashcard: {
    padding: `${theme.spacing(2)} ${theme.spacing(3)} `,
  },
  flashcardSpan: {
    fontFamily: 'Raleway',
    fontSize: '1.1em',
  },
  addButton: {
    ...theme.typography.estimate,
    backgroundColor: `${theme.palette.common.orange} !important`,
    borderRadius: '20px',
    height: '50px',
    opacity: 1,
  },
  flipcard: {
    opacity: 0,
    transition: 'all 1s ease',
  },
  flipcardActivate: {
    opacity: 1,
    transition: 'all 1s ease',
    transform: 'scale(1.08)',
  },
  modalDeleteBox: {
    ...theme.typography.modalBox,
    padding: '60px 40px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '15%',
    [theme.breakpoints.down('xl')]: {
      width: '15%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '25%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
  },
  cancelModalButton: {
    ...theme.typography.cancelModalButton,
  },
  deleteModalButton: {
    ...theme.typography.estimate,
    height: '45px',
    borderRadius: '50px',
  },
  boxAddToFolder: {
    ...theme.typography.modalBox,
    padding: '60px 40px',
    width: '30%',
    [theme.breakpoints.down('lg')]: {
      width: '45%',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
}));

const DeleteModal = ({
  _id,
  user,
  setOpenDeleteModal,
  openDeleteModal,
  classes,
}) => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteSet = () => {
    dispatch(removeSetFetch({ _id, user }));
    setRedirect(true);
    setOpenDeleteModal(false);
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <Modal
      aria-labelledby='modal-delete'
      aria-describedby='delete-modal'
      open={openDeleteModal}
      onClose={() => setOpenDeleteModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box className={classes.modalDeleteBox}>
        <Button
          variant='outlined'
          className={classes.cancelModalButton}
          sx={{ border: 2 }}
          onClick={() => setOpenDeleteModal(false)}
        >
          Anuluj
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className={classes.deleteModalButton}
          type='submit'
          onClick={handleDeleteSet}
        >
          Usuń
        </Button>
      </Box>
    </Modal>
  );
};

const SetOfFlashcard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams();
  const [setData, setSetData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddToFolderModal, setopenAddToFolderModal] = useState(false);

  const getSetFetch = async id => {
    const response = await fetch(`/api/getSet/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
    return await response.json();
  };

  useEffect(() => {
    let mounted = true;
    getSetFetch(id)
      .then(res => {
        if (mounted) {
          setSetData(res);
        }
      })
      .catch(err => console.log('Error: ', err));
    return () => (mounted = false);
  }, [id]);

  return (
    setData && (
      <>
        <Grid container direction='column' className={classes.container}>
          <Grid container item>
            <Typography className={classes.h4} variant='h4'>
              {setData.name}
            </Typography>
          </Grid>
          <Grid
            direction={!matchesMd ? 'row' : 'column'}
            alignItems={
              matchesMd
                ? 'flex-start'
                : matchesLg
                ? 'space-between'
                : 'flex-start'
            }
            container
            item
            mt={4}
          >
            <Grid
              order={{ xs: 2, md: 1, height: '100%' }}
              container
              item
              direction='column'
              xs={3}
              pr={4}
            >
              <Grid item>
                <Typography
                  className={classes.infoText}
                  pl={2}
                  variant='overline'
                >
                  Nauka
                </Typography>
              </Grid>
              <Grid item>
                <MenuList className={classes.menuList}>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <FileCopyIcon
                        className={classes.listItemIcon}
                        color='primary'
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.listItemText}
                    >
                      Fiszki
                    </ListItemText>
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <AltRouteIcon
                        className={classes.listItemIcon}
                        color='primary'
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.listItemText}
                    >
                      Ucz się słówek
                    </ListItemText>
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <CreateIcon
                        className={classes.listItemIcon}
                        color='primary'
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.listItemText}
                    >
                      Pisownia
                    </ListItemText>
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <QuizIcon
                        className={classes.listItemIcon}
                        color='primary'
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.listItemText}
                    >
                      Test
                    </ListItemText>
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <HelpCenterIcon
                        className={classes.listItemIcon}
                        color='primary'
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.listItemText}
                    >
                      ToDo
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Grid>
            </Grid>
            <Grid
              order={{ xs: 1 }}
              justifyContent='center'
              item
              container
              xs={12}
              md={9}
            >
              <CardFlip flashcards={setData.flashcards} classes={classes} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            mt={6}
            xs={12}
            md={11}
            lg={10}
            justifyContent='space-between'
          >
            <Grid xs={7} md={4} item container>
              <Grid mr={1} item sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.common.orange,
                    width: 56,
                    height: 56,
                  }}
                >
                  K
                </Avatar>
              </Grid>
              <Grid
                xs={8}
                container
                item
                direction='column'
                justifyContent='center'
                gap={0.2}
              >
                <Grid item>
                  <Typography className={classes.infoText} variant='body2'>
                    Created by
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.userText} variant='body1'>
                    {setData.user.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent='flex-end'
              spacing={0.5}
              xs={5}
              md={2}
            >
              <Grid item>
                <Tooltip title='Dodaj fiszkę do folderu'>
                  <IconButton onClick={() => setopenAddToFolderModal(true)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item>
                <Tooltip title='Edytuk zestaw'>
                  <IconButton to={`/edit_set/${setData._id}`} component={Link}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title='Informacja o użytkowniku'>
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title='Usuń zestaw'>
                  <IconButton onClick={() => setOpenDeleteModal(true)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={10}>
            <Typography className={classes.userText} variant='h5'>
              Fiszki w zestawie
            </Typography>
          </Grid>
          <Grid container xs={12} md={11} lg={10} item mt={4}>
            {setData ? (
              setData.flashcards.map((flashcard, index) => (
                <Grid
                  key={['flashcard', index].join('')}
                  item
                  xs={12}
                  mt={index !== 0 ? 2 : 0}
                >
                  <Flashcard
                    useStyles={useStyles}
                    flashcard={flashcard}
                    matchesMd={matchesMd}
                    setSetData={setSetData}
                  />
                </Grid>
              ))
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item container justifyContent='center' mt={4}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.addButton}
              component={Link}
              to={`/edit_set/${id}`}
            >
              Dodaj lub usuń fiszkę
            </Button>
          </Grid>
        </Grid>
        <DeleteModal
          _id={setData._id}
          user={setData.user._id}
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          classes={classes}
        />
        <AddToFolderModal
          setId={id}
          openAddToFolderModal={openAddToFolderModal}
          setopenAddToFolderModal={setopenAddToFolderModal}
          classes={classes}
        />
      </>
    )
  );
};

export default SetOfFlashcard;
