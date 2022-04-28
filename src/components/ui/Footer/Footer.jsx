import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Hidden } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

const FooterProps = ({ children, ...props }) => {
  const classes = useStyles(props);

  return <footer className={classes.footer}>{children}</footer>;
};

const useStyles = makeStyles(theme => ({
  footer: props => ({
    backgroundColor: theme.palette.common.blue,
    width: '100%',
    position: 'relative',
    height: `${props.footerHeight}em`,
  }),
  mainContainer: {
    position: 'absolute',
  },
  link: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  gridItem: {
    [theme.breakpoints.up('md')]: {
      margin: '2.3em 2em',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '2.3em 3.5em',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '2.3em 4.5em',
    },
  },
  icon: {
    height: '2em',
    width: '2em',
    color: 'white',
    [theme.breakpoints.down('lg')]: {
      height: '1.5em',
      width: '1.5em',
    },
    [theme.breakpoints.down('md')]: {
      height: '3em',
      width: '3em',
    },
  },
  socialContainer: {
    position: 'absolute',
    right: '2em',
    bottom: 0,
    [theme.breakpoints.down('md')]: {
      right: 0,
      bottom: '50%',
      transform: 'translate(0,50%)',
    },
  },
}));

const Footer = ({ setValue, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FooterProps footerHeight={props.footerHeight}>
      <Hidden mdDown>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent='center'
        >
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid
                onClick={() => setValue(0)}
                item
                component={Link}
                to='/about'
                className={classes.link}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid
                onClick={() => setValue(1)}
                item
                component={Link}
                to='/about'
                className={classes.link}
              >
                O nas
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum dolor sit amet
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid
                onClick={() => setValue(2)}
                item
                component={Link}
                to='/contact'
                className={classes.link}
              >
                Kontakt
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum dolor sit
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum dolor sit amet
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid
                onClick={() => setValue(3)}
                component={Link}
                to='/faq'
                item
                className={classes.link}
              >
                FAQ
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum dolor sit
              </Grid>
              <Grid item className={classes.link}>
                Lorem ipsum sit amet
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.link}>
                Lorem ipsum
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Grid
        container
        justifyContent={`${matches ? 'center' : 'end'}`}
        spacing={2}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={'a'}
          href='https://www.facebook.com/Kopek14/'
          rel='noopener noreferrer'
          target='_blink'
        >
          <FacebookIcon className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href='https://www.instagram.com/mateusz4742/'
          rel='noopener noreferrer'
          target='_blink'
        >
          <InstagramIcon className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href='https://twitter.com/'
          rel='noopener noreferrer'
          target='_blink'
        >
          <TwitterIcon className={classes.icon} />
        </Grid>
      </Grid>
    </FooterProps>
  );
};

export default Footer;
