import React from 'react';
import {
  Backdrop,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import addFolderFetch from '../../../../store/fetchs/folderFetchs/addFolderFetch';
import { useDispatch } from 'react-redux';

const AddFolder = ({ openAddFolderModal, setOpenAddFolderModal, classes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(addFolderFetch(data));
    setOpenAddFolderModal(false);
  };

  return (
    <Modal
      aria-labelledby='modal-add-folder'
      aria-describedby='add-folder-modal'
      open={openAddFolderModal}
      onClose={() => setOpenAddFolderModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box className={classes.boxModal}>
        <Grid
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          container
          direction='column'
          className={classes.form}
        >
          <Grid item>
            <Typography className={classes.h5Registration}>
              Stwórz nowy folder
            </Typography>
          </Grid>
          <Grid item mb={2}>
            <TextField
              {...register('title', {
                required: {
                  value: true,
                  message: 'Pole jest wymagana',
                },
                minLength: {
                  value: 3,
                  message: 'Pole wymaga minimum 3 liter',
                },
              })}
              label='Tytuł'
              variant='outlined'
              fullWidth
              name='title'
              type='text'
              className={classes.textField}
              helperText={errors.title ? errors.title.message : undefined}
            />
          </Grid>
          <Grid item>
            {' '}
            <TextField
              {...register('description', {
                required: {
                  value: true,
                  message: 'Pole jest wymagana',
                },
                minLength: {
                  value: 3,
                  message: 'Pole wymaga minimum 3 liter',
                },
              })}
              label='Opis'
              variant='outlined'
              fullWidth
              name='description'
              type='text'
              className={classes.textField}
              helperText={
                errors.description ? errors.description.message : undefined
              }
            />
          </Grid>
          <Grid item container mt={2} justifyContent='space-between'>
            <Grid item>
              <Button
                variant='outlined'
                className={classes.cancelModalButton}
                sx={{ border: 2 }}
                onClick={() => setOpenAddFolderModal(false)}
              >
                Cofnij
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                className={classes.registerModalButton}
                type='submit'
              >
                Dodaj
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddFolder;
