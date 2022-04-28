import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Home from './ui/Home/Home';
import Footer from './ui/Footer/Footer';
import Header from './ui/Header/Header';
import SetOfFlashcard from './ui/SetOfFlashcard/SetOfFlashcard';
import FlashcardCreator from './ui/FlashcardCreator/FlashcardCreator';
import Folder from './ui/Folder/Folder';

import { useSelector, useDispatch } from 'react-redux';
import { fetchVerifyToken } from '../store/fetchs/fetchVerifyToken';

const FOOTER_HEIGHT = 11; //11em;

function App() {
  const { jwtToken, refreshWebsite } = useSelector(state => state.jwtToken);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const sets = useSelector(state => state.user.sets);

  useEffect(() => {
    const sessionStorageToken = sessionStorage.getItem('userToken');

    if (
      refreshWebsite &&
      sessionStorageToken !== null &&
      sessionStorageToken !== undefined
    ) {
      dispatch(fetchVerifyToken(sessionStorageToken));
    }
  }, [dispatch, refreshWebsite]);

  return (
    <Router>
      <Header
        logIn={jwtToken}
        value={value}
        footerHeight={FOOTER_HEIGHT}
        setValue={setValue}
      />
      <Routes>
        <Route path='/' element={<Home logIn={jwtToken} />} />
        <Route exact path='/folders' element={<Folder />} />
        <Route
          exact
          path='/flashcard/:id'
          element={
            <RequireAuth>
              <SetOfFlashcard sets={sets} />
            </RequireAuth>
          }
        />
        <Route exact path='/about' component={() => <h1>About us</h1>} />
        <Route
          exact
          path='/create_set'
          element={
            <RequireAuth>
              <FlashcardCreator />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='/edit_set/:setId'
          element={
            <RequireAuth>
              <FlashcardCreator />
            </RequireAuth>
          }
        />
        <Route exact path='/faq' element={<h1>FAQ</h1>} />
      </Routes>
      <Footer footerHeight={FOOTER_HEIGHT} value={value} setValue={setValue} />
    </Router>
  );
}

function RequireAuth({ children }) {
  const { successfulLogin } = useSelector(state => state.jwtToken);
  return successfulLogin === true ? children : <Navigate to='/' />;
}

export default App;
