import React, { useState, useEffect } from 'react';

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

const initialRegForm = {
  name: '',
  email: '',
  password: '',
  user_type_id: 0,
};

const RegisterForm = ({ openModalReg, setOpenModalReg, classes }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [repeatPassword, setRepeatPassword] = useState('');
  const [formDataReg, setFormDataReg] = useState(initialRegForm);
  const [registerProcessing, setRegisterProcessing] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(null);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      if (value !== formDataReg.password) {
        return false;
      }
      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  });

  const onChangeRegFormValue = e => {
    setFormDataReg({ ...formDataReg, [e.target.name]: e.target.value });
  };

  const sendRegDataForm = e => {
    e.preventDefault();
    setRegisterProcessing(true);
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataReg),
    }).then(res => {
      setRegisterProcessing(false);
      if (res.status === 200) setSuccessfulRegister(true);
      if (res.status === 401) setSuccessfulRegister(false);
    });
  };
  return (
    <Modal
      open={openModalReg}
      onClose={() => {
        setOpenModalReg(false);
        setSuccessfulRegister(null);
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={classes.boxModal}>
        {successfulRegister === null ? (
          <ValidatorForm onSubmit={sendRegDataForm} className={classes.form}>
            <Typography
              variant='h5'
              component='h5'
              className={classes.h5Registration}
            >
              Rejestracja
            </Typography>
            <TextValidator
              name='name'
              label='Login'
              variant='filled'
              fullWidth
              margin='dense'
              className={classes.textField}
              value={formDataReg.name}
              onChange={onChangeRegFormValue}
              validators={['required']}
              errorMessages={['Pole jest wymagane!']}
            />
            <TextValidator
              name='email'
              label='E-mail'
              variant='filled'
              fullWidth
              margin='dense'
              className={classes.textField}
              value={formDataReg.email}
              onChange={onChangeRegFormValue}
              validators={['required', 'isEmail']}
              errorMessages={[
                'Pole jest wymagane!',
                'Niepoprawny adres e-mail',
              ]}
            />
            <TextValidator
              name='password'
              label='Hasło'
              type='password'
              variant='filled'
              fullWidth
              margin='dense'
              className={classes.textField}
              value={formDataReg.password}
              onChange={onChangeRegFormValue}
              validators={['required']}
              errorMessages={[
                'Pole jest wymagane!',
                'Niepoprawny adres e-mail',
              ]}
            />
            <TextValidator
              label='Powtórz hasło'
              type='password'
              variant='filled'
              fullWidth
              margin='dense'
              className={classes.textField}
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              validators={['required', 'isPasswordMatch']}
              errorMessages={[
                'Pole jest wymagane!',
                'Hasła nie są takie same!',
              ]}
            />
            <Grid container direction='row' alignItems='center' mt={2}>
              <Grid item xs={4}>
                <Button
                  variant='outlined'
                  className={classes.cancelModalButton}
                  sx={{ border: 2 }}
                  onClick={() => setOpenModalReg(false)}
                >
                  Cofnij
                </Button>
              </Grid>
              <Grid item container justifyContent='center' xs={4}>
                <Grid item>
                  {registerProcessing && (
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
                    Zarejestruj
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>
        ) : successfulRegister === true ? (
          <Grid container sx={{ p: 4 }}>
            <Grid
              item
              container
              sm={10}
              justifyContent={matches ? 'start' : 'center'}
            >
              <Typography
                color='success'
                variant='h4'
                className={classes.successfulLoginText}
              >
                Zostałeś zarejestrowany!
              </Typography>
            </Grid>
            {matches && (
              <Grid
                item
                container
                sm={2}
                alignItems='center'
                justifyContent='end'
              >
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
                Rejestracja nie powidło się!
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
                onClick={() => setSuccessfulRegister(null)}
              ></SvgIcon>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default RegisterForm;
