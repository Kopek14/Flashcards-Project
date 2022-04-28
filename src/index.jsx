import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { StyledEngineProvider } from '@mui/material/styles';
import { theme } from './components/ui/Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';

import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        (<App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root')
);
