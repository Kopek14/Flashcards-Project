import * as React from 'react';
import LoggedHome from './LoggedHome/LoggedHome';
import NotLoggedHome from './NotLoggedHome/NotLoggedHome';

const Home = ({ logIn }) => {
  return logIn !== undefined && logIn !== null ? (
    <LoggedHome />
  ) : (
    <NotLoggedHome />
  );
};

export default Home;
