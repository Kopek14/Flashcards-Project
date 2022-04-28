import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Navigate, useLocation, useParams } from 'react-router-dom';

import Flashcard from './Flashcard/Flashcard';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import createSetFetch from '../../../store/fetchs/createSetFetch';
import editSetFetch from '../../../store/fetchs/editSetFetch';
import { setNavigateSetId } from '../../../store/reducerSets';

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
  input: {
    padding: theme.spacing(2),
  },
  textField: {},
  textarea: {
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
  },
  h4: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5em',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  createButton: {
    ...theme.typography.estimate,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '10px 20px',
    [theme.breakpoints.up('sm')]: {
      fontWeight: 600,
      padding: '5px 10px',
    },
  },
  inputLabel: {
    width: '100%',
    heght: '100%',
    opacity: 0.5,
  },
  select: {
    paddingLeft: theme.spacing(1),
  },
  formControlLabel: {
    justifyContent: 'end',
    // '&:first-child': {
    //   paddingRight: theme.spacing(4),
    // },
  },
  errorText: {
    fontSize: '.9em',
  },
  flashcardContainer: {
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
  },
  flashcardContainerBottom: {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  errorMessage: {
    color: '#d32f2f',
    marginTop: theme.spacing(4),
  },
}));

const initialSetData = {
  name: '',
  description: '',
  category: '',
  visibleForUsers: true,
  flashcards: [],
  folder: '',
  user: '',
  resemblance: '',
};

let idFlashcard = 0;

const FlashcardCreator = () => {
  const { isPending, navigateSetId } = useSelector(state => state.user);
  const { setId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [setData, setSetData] = useState(initialSetData);
  const [flashcardIdsToRemoveArray, setflashcardIdsToRemoveArray] = useState(
    []
  );

  const [flashcardArray, setFlashcardArray] = useState([
    {
      term: '',
      definition: '',
      resemblance: '',
      id: idFlashcard++,
      star: false,
    },
    {
      term: '',
      definition: '',
      resemblance: '',
      id: idFlashcard++,
      star: false,
    },
  ]);

  const checkFlashcardsValid = () => {
    let valid = false;

    for (let i = 0; i < flashcardArray.length; i++) {
      if (
        flashcardArray[i].term === '' ||
        flashcardArray[i].definition === ''
      ) {
        valid = true;
        break;
      }
    }

    return valid;
  };

  const onSubmit = () => {
    setErrorMessage(null);

    if (flashcardArray.length <= 1) {
      setErrorMessage('W zestawie muszą być przynajmniej 2 fiszki');
      return;
    }
    if (checkFlashcardsValid()) {
      setErrorMessage('Fiszki nie mogą być puste!');
      return;
    }
    dispatch(createSetFetch({ ...setData, flashcards: flashcardArray }));

    setTimeout(() => {
      dispatch(setNavigateSetId());
    }, 2000);
  };

  const onSubmitEdit = () => {
    setErrorMessage(null);

    if (flashcardArray.length <= 1) {
      setErrorMessage('W zestawie muszą być przynajmniej 2 fiszki');
      return;
    }
    if (checkFlashcardsValid()) {
      setErrorMessage('Fiszki nie mogą być puste!');
      return;
    }

    dispatch(
      editSetFetch({
        setData: {
          ...setData,
          user:
            typeof setData.user === 'string' ? setData.user : setData.user._id,
          flashcards: flashcardArray,
        },
        flashcardsToRemove: flashcardIdsToRemoveArray,
      })
    );

    setTimeout(() => {
      dispatch(setNavigateSetId());
    }, 2000);
  };

  const onChangeSetData = e => {
    setSetData({ ...setData, [e.target.name]: e.target.value });
  };
  const onChangeSwichSetData = e => {
    setSetData({ ...setData, [e.target.name]: e.target.checked });
  };
  const onChangeFlashcardArray = (e, index) => {
    const newFlashcardArray = flashcardArray;
    newFlashcardArray[index][e.target.name] = e.target.value;
    setFlashcardArray([...newFlashcardArray]);
  };

  const handleDeleteFlashcard = index => {
    if (pathname.includes('/edit_set')) {
      flashcardArray.forEach((flashcard, i) => {
        if (i === index) {
          setflashcardIdsToRemoveArray(state => [
            ...state,
            { id: flashcardArray[index]._id, user: flashcardArray[index].user },
          ]);
          // console.log(flashcardArray[index]);
        }
      });
    }
    const newFlashcardArray = flashcardArray.filter((item, i) => i !== index);
    setFlashcardArray(newFlashcardArray);
  };

  const handleAddNewFlashcard = () => {
    const newFlashcardArray = flashcardArray.slice();
    newFlashcardArray.push({
      term: '',
      definition: '',
      resemblance: '',
      id: idFlashcard++,
      star: false,
    });
    setFlashcardArray(newFlashcardArray);
  };

  useEffect(() => {
    if (!setId || !pathname.includes('/edit_set/')) {
      return;
    }

    fetch(`/api/getSet/${setId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setSetData({ ...res, category: '', visibleForUsers: true });
        setFlashcardArray(
          res.flashcards.map(item => ({
            ...item,
            id: idFlashcard++,
          }))
        );
      })
      .catch(err => console.log('Error: ', err));

    // const setToEdit = sets.filter(set => set._id === setId);

    // setSetData({
    //   ...setToEdit[0],
    // });

    // setFlashcardArray(
    //   setToEdit[0].flashcards.map(item => ({
    //     ...item,
    //     id: idFlashcard++,
    //   }))
    // );
  }, [setId, pathname]);

  const ErrorMessage = props => {
    const classes = props.classes;
    const [message] = useState(props.message || '');

    return (
      <Typography className={classes.errorMessage} variant='subtitle2'>
        {message}
      </Typography>
    );
  };

  if (navigateSetId !== '') {
    return <Navigate to={`/flashcard/${navigateSetId}`} />;
  }

  return (
    <Grid container className={classes.container}>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          item
          mt={4}
          mb={4}
          justifyContent={matchesSm ? 'center' : 'space-between'}
        >
          <Grid item sx={{ display: 'flex', alignContent: 'center' }}>
            <Typography variant='h4' className={classes.h4}>
              Tworzenie nowego zestawu fiszek.
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: matchesSm ? 'none' : 'block',
            }}
          >
            {' '}
            {pathname.includes('/edit_set/') ? (
              <Button
                disabled={isPending}
                type='submit'
                variant='outlined'
                sx={{
                  border: `solid 2px rgba(11, 114, 185, 1) `,
                }}
                onClick={handleSubmit(onSubmitEdit)}
              >
                Edytuj
              </Button>
            ) : (
              <Button
                type='submit'
                variant='contained'
                className={classes.createButton}
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                Stwórz
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item container className={classes.form} gap={2}>
          <Grid item xs={12}>
            <Input
              {...register('name', {
                required: {
                  value: true,
                  message: 'Pole jest wymagane!',
                },
                minLength: {
                  value: 3,
                  message: 'Pole wymaga minimum 3 znaków',
                },
                maxLength: 50,
              })}
              error={errors.name !== undefined}
              className={classes.input}
              placeholder='Nazwa zestawu'
              inputProps={{ 'aria-label': 'description' }}
              label='Nazwa zestawu'
              variant='filled'
              fullWidth
              value={setData.name}
              name='name'
              type='text'
              onChange={onChangeSetData}
            />
            <FormHelperText
              style={{ display: errors.name !== undefined ? 'block' : 'none' }}
              error
              variant='filled'
              className={classes.errorText}
            >
              {errors.name !== undefined ? errors.name.message : undefined}
            </FormHelperText>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item md={6} xs={12}>
              <Input
                {...register('description')}
                className={classes.textarea}
                placeholder='Opis'
                name='description'
                value={setData.description}
                multiline={true}
                rows={4}
                onChange={onChangeSetData}
              />
            </Grid>
            <Grid
              item
              direction={matchesMd ? 'column' : 'row'}
              md={6}
              spacing={matchesMd ? 0 : 5}
              container
              justifyContent='space-between'
            >
              <Grid xs={6} item sx={{ width: '100%' }}>
                <FormControl fullWidth variant='standard'>
                  <InputLabel
                    id='selectCategoryLabel'
                    className={classes.inputLabel}
                  >
                    Kategoria
                  </InputLabel>
                  <Select
                    {...register('category')}
                    name='category'
                    id='selectCategory'
                    labelId='selectCategoryLabel'
                    value={setData.category}
                    onChange={onChangeSetData}
                    label='Kategoria'
                    className={classes.select}
                  >
                    <MenuItem value=''>Brak</MenuItem>
                    <MenuItem value='Sport'>Sport</MenuItem>
                    <MenuItem value='Moda'>Moda</MenuItem>
                    <MenuItem value='Zabawa'>Zabawa</MenuItem>
                    <MenuItem value='Inne'>Inne</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                xs={6}
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 'auto',
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                      <Switch
                        defaultChecked
                        {...register('visibleForUsers')}
                        name='visibleForUsers'
                        value={setData.visibleForUsers}
                        onChange={onChangeSwichSetData}
                      />
                    }
                    label='Widoczny dla użytkowników'
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {errorMessage && (
        <ErrorMessage classes={classes} message={errorMessage} />
      )}
      {flashcardArray.map((item, index) => (
        <Flashcard
          classes={classes}
          key={item.id}
          item={index + 1}
          deleteItem={handleDeleteFlashcard}
          index={index}
          onchange={onChangeFlashcardArray}
          term={flashcardArray[index].term}
          definition={flashcardArray[index].definition}
          matchesLg={matchesLg}
          matchesMd={matchesMd}
          setRemoveFlashcard={setflashcardIdsToRemoveArray}
        />
      ))}
      <Grid container item xs={12} mt={4} mr={2} justifyContent='center'>
        <Grid item>
          <Button
            type='submit'
            variant='contained'
            className={classes.createButton}
            onClick={handleAddNewFlashcard}
          >
            Dodaj kolejną fiszkę
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} mt={4} mr={2} justifyContent='flex-end'>
        <Grid item>
          {pathname.includes('/edit_set/') ? (
            <Button
              type='submit'
              variant='outlined'
              sx={{
                border: `solid 2px rgba(11, 114, 185, 1) `,
              }}
              onClick={handleSubmit(onSubmitEdit)}
              disabled={isPending}
            >
              Edytuj
            </Button>
          ) : (
            <Button
              type='submit'
              variant='outlined'
              sx={{
                border: `solid 2px rgba(11, 114, 185, 1) `,
              }}
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              Stwórz
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FlashcardCreator;
