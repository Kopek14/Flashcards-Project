import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Modal, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SvgIcon } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { fetchUserSets } from '../../../../store/fetchs/userFetch';
import getFoldersFetch from '../../../../store/fetchs/folderFetchs/getFoldersFetch';
import { tokenFetch } from '../../../../store/fetchs/tokenFetch';

const initialLogForm = {
  name: '',
  password: '',
};

const LoginForm = ({ openModalLog, setOpenModalLog, classes }) => {
  const dispatch = useDispatch();
  const { isPending, jwtToken, successfulLogin } = useSelector(
    state => state.jwtToken
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [formDataLog, setFormDataLog] = useState(initialLogForm);

  const onChangeLogFormValue = e => {
    setFormDataLog({ ...formDataLog, [e.target.name]: e.target.value });
  };

  const sendLogDataForm = e => {
    e.preventDefault();
    console.log(isPending);
    if ((jwtToken !== null || jwtToken !== undefined) && isPending) {
      return;
    }
    dispatch(tokenFetch(formDataLog));
  };

  useEffect(() => {
    if (jwtToken !== undefined && jwtToken !== null) {
      dispatch(fetchUserSets());
      dispatch(getFoldersFetch());
    }
  }, [jwtToken, dispatch, successfulLogin]);

  return (
    <Modal
      open={openModalLog}
      onClose={() => {
        setOpenModalLog(false);
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={classes.boxModal}>
        {successfulLogin === false ? (
          <ValidatorForm onSubmit={sendLogDataForm} className={classes.form}>
            <Typography
              variant='h5'
              component='h5'
              className={classes.h5Registration}
            >
              Logowanie
            </Typography>
            <TextValidator
              name='name'
              label='Login'
              variant='filled'
              fullWidth
              margin='dense'
              className={classes.textField}
              value={formDataLog.name}
              onChange={onChangeLogFormValue}
              validators={['required']}
              errorMessages={['Pole jest wymagane!']}
            />
            <TextValidator
              name='password'
              label='Hasło'
              type='password'
              variant='filled'
              fullWidth
              margin='dense'
              className={classes.textField}
              value={formDataLog.password}
              onChange={onChangeLogFormValue}
              validators={['required']}
              errorMessages={['Pole jest wymagane!']}
            />
            <Grid container direction='row' alignItems='center' mt={2}>
              <Grid item xs={4}>
                <Button
                  variant='outlined'
                  className={classes.cancelModalButton}
                  sx={{ border: 2 }}
                  onClick={() => setOpenModalLog(false)}
                >
                  Cofnij
                </Button>
              </Grid>
              <Grid item container justifyContent='center' xs={4}>
                <Grid item>
                  {isPending && (
                    <CircularProgress className={classes.circularProgress} />
                  )}
                </Grid>
              </Grid>
              <Grid item container justifyContent='flex-end' xs={4}>
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.registerModalButton}
                    type='submit'
                  >
                    Zaloguj
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>
        ) : successfulLogin === true ? (
          <Grid container sx={{ p: 4 }}>
            <Grid item container sm={10} justifyContent='center'>
              <Typography
                color='success'
                variant='h4'
                className={classes.successfulLoginText}
              >
                Zostałeś zalogowany
              </Typography>
            </Grid>
            {!matches && (
              <Grid item container sm={2} alignItems='center'>
                <SvgIcon
                  className={classes.successfulLoginIcon}
                  component={DoneIcon}
                ></SvgIcon>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid container sx={{ p: 4 }}>
            <Grid item container xs={10} justifyContent='center'>
              <Typography
                color='success'
                variant='h4'
                className={classes.successfulLoginText}
                sx={{ fontSize: '1.5rem' }}
              >
                Logowanie nie powidło się - sprawdź poprawność danych!
              </Typography>
            </Grid>
            <Grid item container xs={2} alignItems='center'>
              <SvgIcon
                sx={{
                  transition: '.2s linear all',
                  ':hover': {
                    cursor: 'pointer',
                    color: '#FFBA60',
                  },
                }}
                className={classes.successfulLoginIcon}
                component={ArrowBackIcon}
              ></SvgIcon>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default LoginForm;
