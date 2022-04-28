import React, { useEffect, useState, useCallback } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import quotesOpen from '../../../../../assets/quotesOpen.svg';
import quotesClose from '../../../../../assets/quotesClose.svg';

const useStyles = makeStyles(theme => ({
  carousel: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.spacing(16),
  },
  inner: {
    display: 'inline-block',
    width: '100%',
    whiteSpace: 'nowrap',
    transition: 'transform 1s',
  },
  carouselItem: {
    position: 'relative',
    padding: theme.spacing(2),
    display: 'inline-block',
    fontSize: '2.1em',
    lineHeight: 1.3,
    fontWeight: 'bold',
    whiteSpace: 'normal',
    textAlign: 'center',
    width: `calc(100% - ${theme.spacing(4)})`,
    '&::before': {
      content: `url(${quotesOpen})`,
      position: 'relative',
      alignSelf: 'start',
      top: '-1rem',
      marginRight: theme.spacing(0.5),
    },
    '&::after': {
      content: `url(${quotesClose})`,
      position: 'relative',
      top: '1rem',
      marginLeft: theme.spacing(0.5),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8em',
    },
  },
}));

export const CarouselItem = ({ children, author, shortTextCenter }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant='h3'
        xs={12}
        className={classes.carouselItem}
        sx={{
          top: shortTextCenter ? '-50%' : 'auto',
          transform: shortTextCenter ? 'translateY(50%)' : '',
        }}
      >
        {children}
      </Typography>
    </>
  );
};

let iQuotesGlobal = 0;
let reverseGlobal = 0;
let intervalIndex = null;

const Carousel = ({ children, delayTimer }) => {
  const classes = useStyles();
  const [translateValue, setTranslateValue] = useState('0%');
  const [reverse, setReverse] = useState(0);
  const [indexQuotes, setIndexQuotes] = useState(0);
  const [countChildren] = useState(React.Children.count(children) - 1);

  const startCarouselInterval = useCallback(() => {
    intervalIndex = setInterval(() => {
      if (iQuotesGlobal === countChildren) {
        setReverse(1);
      } else if (iQuotesGlobal === 0) {
        setReverse(0);
      }
      if (reverseGlobal) {
        setIndexQuotes(iQuotesGlobal - 1);
        setTranslateValue('-' + iQuotesGlobal + '00%');
      } else {
        setIndexQuotes(iQuotesGlobal + 1);
        setTranslateValue('-' + iQuotesGlobal + '00%');
      }
    }, delayTimer);
  }, [countChildren, delayTimer]);

  useEffect(() => {
    startCarouselInterval();
    return () => clearInterval(intervalIndex);
  }, [startCarouselInterval]);

  iQuotesGlobal = indexQuotes;
  reverseGlobal = reverse;

  return (
    <div className={classes.carousel}>
      <div
        className={classes.inner}
        style={{ transform: `translateX(${translateValue})` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child);
        })}
      </div>
    </div>
  );
};

export default Carousel;
