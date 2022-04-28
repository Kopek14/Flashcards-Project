import { createTheme } from '@mui/material/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGold = '#FFD700';
const arcSilver = '#C0C0C0';
const arcBronze = '#CD7F32';
//const arcGrey = "#868686";

export const theme = createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
      gold: `${arcGold}`,
      silver: `${arcSilver}`,
      bronze: `${arcBronze}`,
    },
    primary: {
      main: `${arcBlue}`,
      contrastText: '#fff',
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    h3: {
      fontWeight: 300,
    },
    h4: {
      display: 'inline',
    },
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      color: 'white',
      opacity: 0.7,
      fontSize: '1rem',
    },
    estimate: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white',
    },
    inputText: {
      backgroundColor: 'white',
      color: 'black',
      '&>p': {
        margin: `0!important`,
        backgroundColor: '#d32f2f',
        color: `white!important`,
        paddingLeft: '8px',
      },
    },
    modalBox: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      backgroundColor: `${arcBlue}`,
      flexShrink: 0,
    },
    cancelModalButton: {
      textTransform: 'none',
      letterSpacing: '2px',
      color: 'white',
      height: '45px',
      borderRadius: '50px',
      borderColor: 'white',
      fontSize: '.9rem',
      '&:hover': {
        border: '2px solid',
        borderColor: arcOrange,
        color: arcOrange,
      },
    },
  },
});
