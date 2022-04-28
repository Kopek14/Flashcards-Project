import React from 'react';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography, useMediaQuery } from '@mui/material';

import Carousel, { CarouselItem } from './Carousel/Carousel';

import image1 from '../../../../assets/book-gb34e658e6_1280.jpg';
import image2 from '../../../../assets/book-gdcbc9b6e7_640.jpg';
import image3 from '../../../../assets/laptop-g58bea903c_640.jpg';
import image4 from '../../../../assets/person-g2c3f75f7d_640.jpg';
import image5 from '../../../../assets/teacher-g3f8b3a53d_640.jpg';
import curveImage from '../../../../assets/wywijas.svg';
import { useTheme } from '@emotion/react';

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
  firstSection: {
    position: 'relative',
    borderRadius: '0',

    boxShadow: 'inset 2px -15em 35px -10px rgba(0, 0, 0, 0.5);',
    height: '45em',
    backgroundImage: `url(${image2})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    padding: theme.spacing(8),
    marginTop: theme.spacing(4),
    marginBot: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${image1})`,
      backgroundSize: 'cover',
      borderRadius: '30px',
    },
  },
  firstSectionText: {
    color: 'white',
    fontSize: '1.8em',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      fontSize: '2.5em',
    },
  },
  firstSectionButton: {
    fontWeight: 'bold',
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    borderRadius: '10px',
  },
  secondSectionContainer: {
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(16),
  },
  secondSection: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    display: 'block',
    whiteSpace: 'wrap',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8em',
    },
  },
  secondSectionText1: {
    fontSize: '1em',
    fontWeight: 'bold',
    padding: theme.spacing(7),
    backgroundImage: `url(${curveImage})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  centerText: {
    [theme.breakpoints.down('md')]: {
      display: 'inline-flex',
      justifyContent: 'center',
    },
  },
  thirdSectionTextH4: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      padding: `0 ${theme.spacing(1.3)}`,
    },
  },
  thirdSectionContainer: {
    marginBottom: theme.spacing(16),
  },
  thirdSectionTextBody: {
    fontSize: '1.3em',
    lineHeight: 1.8,
    color: 'rgba(0, 0,0,0.7)',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      padding: `0 ${theme.spacing(1.3)}`,
    },
  },
  thirdSectionGridImg: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  thirdSectionImg: {
    borderRadius: '10px',
    width: '495px',
    filter: 'contrast(90%)',
    [theme.breakpoints.down('md')]: {
      width: '350px',
    },
  },
}));

const NotLoggedHome = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        className={classes.firstSection}
        alignContent='flex-end'
        justifyContent='space-between'
      >
        <Grid item xs={12} md={6}>
          <Typography className={classes.firstSectionText} variant='h5'>
            Sprawimy, że będziesz nie do zatrzymania
          </Typography>
          <Typography color='white' variant='body1' fontSize='1.2em'>
            Opanuj każdy przedmiot, osiągaj sukcesy na każdym polu
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex' }}
          alignItems='flex-end'
          justifyContent={mdMatches ? 'flex-end' : 'flex-start'}
        >
          <Button
            variant='contained'
            size='large'
            className={classes.firstSectionButton}
          >
            Rozpocznij naukę
          </Button>
        </Grid>
      </Grid>
      <Grid item container className={classes.secondSectionContainer}>
        <Grid item container component='p' className={classes.secondSection}>
          <Typography component='em' className={classes.secondSectionText1}>
            90%
          </Typography>
          uczniów korzystających z strony Kopka potwierdza, że otrzymuje lepsze
          oceny.
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnSpacing={18}
        className={classes.thirdSectionContainer}
      >
        <Grid
          item
          container
          direction='column'
          xs={12}
          md={6}
          spacing={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
          order={{ xs: 2, md: 1 }}
        >
          <Grid item className={classes.centerText}>
            <Typography variant='h4' className={classes.thirdSectionTextH4}>
              Twój kolejny sukces czeka na Ciebie tuż za rogiem.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              className={classes.thirdSectionTextBody}
            >
              Każdy nowy fakt, którego się nauczysz, jest Twoim sukcesem.
              Quizlet przełamuje zagadnienia i przedmioty, dzięki czemu na
              każdym kroku osiągasz coś nowego.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          className={classes.thirdSectionGridImg}
        >
          <img
            className={classes.thirdSectionImg}
            src={image3}
            alt='Girl at the computer'
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnSpacing={18}
        className={classes.thirdSectionContainer}
      >
        <Grid
          item
          container
          xs={12}
          md={6}
          className={classes.thirdSectionGridImg}
          order={{ xs: 1, md: 2 }}
        >
          <img
            className={classes.thirdSectionImg}
            src={image4}
            alt='Girl at the computer'
          />
        </Grid>
        <Grid
          item
          container
          direction='column'
          xs={12}
          md={6}
          spacing={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
          order={{ xs: 1, md: 2 }}
        >
          <Grid item className={classes.centerText}>
            <Typography variant='h4' className={classes.thirdSectionTextH4}>
              Miejcie otwarte umysły, my zatroszczymy się o całą resztę.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              className={classes.thirdSectionTextBody}
            >
              Możesz korzystać z przeróżnych narzędzi, stawiając w ten sposób
              czoła każdemu wyzwaniu. Począwszy od fiszek, które są niezwykle
              pomocne w nauce języka angielskiego, po gry, które ułatwiają
              zrozumienie historii.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnSpacing={18}
        className={classes.thirdSectionContainer}
      >
        <Grid
          item
          container
          direction='column'
          xs={12}
          md={6}
          order={{ xs: 2, md: 1 }}
          spacing={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item className={classes.centerText}>
            <Typography variant='h4' className={classes.thirdSectionTextH4}>
              Nie irytuj się. Zrób to.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              className={classes.thirdSectionTextBody}
            >
              Gdy nawet najmniejsza lekcja smakuje jak zwycięstwo, łatwo iść
              naprzód.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          className={classes.thirdSectionGridImg}
          order={{ xs: 1, md: 2 }}
        >
          <img
            className={classes.thirdSectionImg}
            src={image5}
            alt='Girl at the computer'
          />
        </Grid>
      </Grid>
      <Carousel delayTimer={20000}>
        <CarouselItem>
          Quizlet to wspaniały sposób na naukę. Powiedziałam o tym swoim kolegom
          i teraz wszyscy robimy postępy. Ilekroć myślę o Quizlet, przychodzi mi
          na myśl czysta radość z nauki trwającej zaledwie kilka minut zamiast
          przesiadywania nad nią godzinami.
        </CarouselItem>
        <CarouselItem shortTextCenter>
          Quizlet znacznie poprawił moje oceny w szkole. Dziękuję Wam za to, że
          nauka zamieniła się w zabawę i stała się produktywna!
        </CarouselItem>
        <CarouselItem>
          Gdy przychodziło mi się uczyć, byłam w totalnej rozsypce. Teraz jestem
          na nowym uniwersytecie, na którym zapoznano mnie z Quizlet. Nie
          stresuję się już więcej, gdy muszę nauczyć się wyznaczonego materiału.
          DZIĘKUJĘ CI QUIZLET!!!
        </CarouselItem>
      </Carousel>
    </Grid>
  );
};

export default NotLoggedHome;
