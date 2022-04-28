import React, { useState, useEffect, useMemo } from 'react';

import LoginForm from './LoginForm/LoginForm';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { ListItemText } from '@mui/material';
import { Drawer, List, ListItem } from '@mui/material';
import { Divider } from '@mui/material';
import { styled, alpha } from '@mui/material';

import logo from '../../../assets/logo.svg';
import { Menu, MenuItem } from '@mui/material';
import RegisterForm from './RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { setJwtToken } from '../../../store/reducerToken';
import AddFolder from './AddFolder/AddFolder';

const EXPIRES_TIME_LOG_IN = 5690000;

const StyledMenu = styled(props => <Menu elevation={0} {...props} />)(
  ({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 5,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.common.blue,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        padding: '10px 15px',
        '& .MuiSvgIcon-root': {
          fontSize: 22,
          color: theme.palette.common.blue,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  })
);

const FabStyled = React.memo(props => {
  const classes = useStyles(props);
  return (
    <Fab {...props} className={classes.fab}>
      <AddIcon />
    </Fab>
  );
});

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    marginBottom: '7em',
  },
  logo: {
    height: '7em',
    color: theme.palette.common.white,
    margin: theme.spacing(1),
  },
  tabs: {
    marginLeft: 'auto',
  },
  tabRoot: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  registerButton: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    padding: '8px 40px',
    '&:hover': {
      opacity: 1,
    },
  },
  menuIconButton: {
    marginLeft: 'auto',
  },
  menuIcon: {
    fontSize: '2rem',
  },
  list: {
    //todo
  },
  listItem: {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  divider: {
    borderWidth: 'bold',
    borderColor: 'white',
    opacity: 0.5,
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
    width: '75%',
  },
  drawerItem: {
    display: 'flex',
    fontFamily: 'Raleway',
    textTransform: 'none',
    fontWeight: 700,
    color: 'white',
    fontSize: '1rem',
    justifyContent: 'center',
  },
  boxModal: {
    ...theme.typography.modalBox,
    [theme.breakpoints.down('xl')]: {
      width: '35%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  form: {
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    ...theme.typography.inputText,
    '.MuiFormHelperText-root': {
      backgroundColor: 'green',
    },
  },
  registerModalButton: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginTop: theme.spacing(1),
    height: '45px',
  },
  cancelModalButton: {
    ...theme.typography.cancelModalButton,
    marginRight: 'auto',
    marginTop: theme.spacing(1),
  },
  h5Registration: {
    ...theme.typography.estimate,
    fontSize: '1.6rem',
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&:before': {
      content: '',
      background: `linear-gradient(${theme.palette.common.orange},${theme.palette.common.blue})`,
      positon: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
    },
    '&:hover:before': {
      width: '100%',
    },
  },
  circularProgress: {
    color: theme.palette.common.white,
  },
  successfulLoginText: {
    color: theme.palette.common.white,
    opacity: 0.8,
    width: 'auto',
    fontFamily: 'Raleway',
    fontWeight: 500,
    overflow: 'hidden',
  },
  successfulLoginIcon: {
    color: theme.palette.common.white,
    opacity: 0.8,
    fontSize: '2.5rem',
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1337,
    backgroundColor: `${theme.palette.common.orange} !important`,
    color: 'white',
  },
}));

const Header = ({ value, setValue, logIn, ...props }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElAddFlashcard, setAnchorElAddFlashcard] = useState(null);
  const openFlashcard = Boolean(anchorElAddFlashcard);

  const [anchorElAddFlashcardFAB, setAnchorElAddFlashcardFAB] = useState(null);
  const openFlashcardFAB = Boolean(anchorElAddFlashcardFAB);

  const [openDrawer, setOpenDrawer] = useState(matches ? true : false);
  const [openModalReg, setOpenModalReg] = useState(false);
  const [openModalLog, setOpenModalLog] = useState(false);
  const [openAddFolderModal, setOpenAddFolderModal] = useState(false);

  const { jwtToken } = useSelector(state => state.jwtToken);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClickFlashcard = event =>
    setAnchorElAddFlashcard(event.currentTarget);
  const handleClickFlashcardFAB = event =>
    setAnchorElAddFlashcardFAB(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handleCloseFlashcard = () => setAnchorElAddFlashcard(null);
  const handleCloseFlashcardFAB = () => setAnchorElAddFlashcardFAB(null);

  const handleDrawer = newValue => setOpenDrawer(newValue);

  const onChange = (e, value) => {
    setValue(value);
  };

  const logOutHandle = () => {
    dispatch(setJwtToken(sessionStorage.getItem('userToken')));
    if (jwtToken !== undefined && jwtToken !== null) {
      sessionStorage.removeItem('userToken');
      dispatch(setJwtToken(null));
    }
  };

  const checkUserLogIntervalIndex = useMemo(() => {
    return setInterval(() => {
      dispatch(setJwtToken(sessionStorage.getItem('userToken')));
      if (jwtToken !== undefined && jwtToken !== null) {
        sessionStorage.removeItem('userToken');
        dispatch(setJwtToken(null));
      }
    }, EXPIRES_TIME_LOG_IN);
  }, [dispatch, jwtToken]);

  const routes = useMemo(() => {
    return [
      { label: 'Strona Główna', path: '/', activeIndex: 0 },
      { label: 'Kontakt', path: '/contact', activeIndex: 1 },
      { label: 'FAQ', path: '/faq', activeIndex: 2 },
    ];
  }, []);

  useEffect(() => {
    [routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.path}`:
          if (value !== route.activeInex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, routes, setValue]);

  useEffect(() => {
    return () => clearInterval(checkUserLogIntervalIndex);
  }, [checkUserLogIntervalIndex]);

  const menuMobile = (
    <>
      <IconButton
        className={classes.menuIconButton}
        disableRipple
        aria-label='delete'
        onClick={() => handleDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Drawer
        classes={{ paper: classes.drawer }}
        anchor='left'
        open={openDrawer}
        onClose={() => handleDrawer(false)}
        onPointerEnter={() => handleDrawer(true)}
      >
        <List className={classes.list}>
          {routes.map(({ label, path }, index) => (
            <React.Fragment key={index * 10}>
              <ListItem
                component={Link}
                to={path}
                className={classes.listItem}
                button
                onClick={() => {
                  handleDrawer(false);
                  setValue(index);
                }}
              >
                <ListItemText
                  primary={label}
                  disableTypography
                  className={classes.drawerItem}
                  sx={{ opacity: `${index === value ? 1 : 0.7}` }}
                />
              </ListItem>
              {!(label === 'FAQ') ? (
                <Divider variant='middle' className={classes.divider} />
              ) : undefined}
            </React.Fragment>
          ))}
        </List>
        <Divider
          sx={{
            borderWidth: '1px',
            borderColor: theme.palette.common.white,
            opacity: 0.5,
          }}
        />
        <List>
          {!logIn
            ? ['Zaloguj', 'Zarejestruj'].map((text, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    className={classes.listItem}
                    button
                    onClick={() => handleDrawer(false)}
                  >
                    <ListItemText
                      disableTypography
                      primary={text}
                      className={classes.drawerItem}
                      sx={{ opacity: 0.7 }}
                      onClick={() => {
                        text === 'Zaloguj'
                          ? setOpenModalLog(true)
                          : setOpenModalReg(true);
                        handleDrawer(false);
                      }}
                    />
                  </ListItem>
                  {!(text === 'Zarejestruj') ? (
                    <Divider variant='middle' className={classes.divider} />
                  ) : undefined}
                </React.Fragment>
              ))
            : ['Mój Profil', 'Wyloguj'].map((text, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    className={classes.listItem}
                    button
                    onClick={() => {
                      text === 'Wyloguj'
                        ? logOutHandle()
                        : (() => console.log('ToDo'))();
                      handleDrawer(false);
                    }}
                  >
                    <ListItemText
                      disableTypography
                      primary={text}
                      className={classes.drawerItem}
                      sx={{ opacity: 0.7 }}
                    />
                  </ListItem>
                  {!(text === 'Zarejestruj') ? (
                    <Divider variant='middle' className={classes.divider} />
                  ) : undefined}
                </React.Fragment>
              ))}
        </List>
      </Drawer>
    </>
  );
  const menuComp = (
    <>
      {logIn === null ? undefined : (
        <Button
          className={classes.tabRoot}
          aria-controls='add-flashcard-menu'
          aria-haspopup='true'
          aria-expanded={openFlashcard ? 'true' : undefined}
          onClick={handleClickFlashcard}
        >
          Dodaj{<KeyboardArrowDownIcon sx={{ fontSize: 30 }} />}
        </Button>
      )}
      <Tabs
        textColor='inherit'
        indicatorColor='primary'
        className={classes.tabs}
        value={value}
        onChange={onChange}
      >
        <Tab
          label='Strona domowa'
          className={classes.tabRoot}
          component={Link}
          to='/'
        />
        <Tab
          label='Kontakt'
          className={classes.tabRoot}
          component={Link}
          to='/contact'
        />
        <Tab
          label='FAQ'
          className={classes.tabRoot}
          component={Link}
          to='/faq'
        />
      </Tabs>
      {logIn ? (
        <Button
          variant='contained'
          color='secondary'
          className={classes.registerButton}
          aria-controls='log-reg'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onMouseOver={handleClick}
        >
          Mój profil
        </Button>
      ) : (
        <Button
          variant='contained'
          color='secondary'
          className={classes.registerButton}
          aria-controls='log-reg'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onMouseOver={handleClick}
        >
          Logowanie
        </Button>
      )}
      <StyledMenu
        id='add-flashcard-menu'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'add-flashcard',
        }}
        anchorEl={anchorElAddFlashcard}
        open={openFlashcard}
        onClose={handleCloseFlashcard}
      >
        <MenuItem
          onClick={handleCloseFlashcard}
          disableRipple
          component={Link}
          to='/create_set'
        >
          <AddCircleIcon />
          Dodaj zestaw fiszek
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseFlashcard();
            setOpenAddFolderModal(true);
          }}
          disableRipple
        >
          <CreateNewFolderIcon />
          Dodaj nowy folder
        </MenuItem>
      </StyledMenu>
      <StyledMenu
        id='log-reg'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {logIn
          ? ['Mój profil', 'Wyloguj'].map((item, index) => (
              <MenuItem
                key={index * 20}
                onClick={() => {
                  item === 'Wyloguj'
                    ? logOutHandle()
                    : (() => console.log('ToDo'))();
                  handleClose();
                }}
                disableRipple
              >
                {item === 'Wyloguj' ? <LogoutIcon /> : <FaceIcon />}
                {item}
              </MenuItem>
            ))
          : ['Zaloguj', 'Zarejestruj'].map((item, index) => (
              <MenuItem
                key={index * 30}
                onClick={() => {
                  item === 'Zaloguj'
                    ? setOpenModalLog(true)
                    : setOpenModalReg(true);
                  handleClose();
                }}
                disableRipple
              >
                {item === 'Zaloguj' ? <LoginIcon /> : <LockOpenIcon />}
                {item}
              </MenuItem>
            ))}
      </StyledMenu>
    </>
  );

  const StyledMenuFAB = () => (
    <StyledMenu
      id='add-flashcard-menu-fab'
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      MenuListProps={{
        'aria-labelledby': 'add-flashcard-fab',
      }}
      anchorEl={anchorElAddFlashcardFAB}
      open={openFlashcardFAB}
      onClose={handleCloseFlashcardFAB}
    >
      <MenuItem onClick={handleCloseFlashcardFAB} disableRipple>
        <AddCircleIcon />
        Add FlashCard
      </MenuItem>
      <MenuItem onClick={handleCloseFlashcardFAB} disableRipple>
        <CreateNewFolderIcon />
        Add New Folder
      </MenuItem>
    </StyledMenu>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar disableGutters>
            <img alt='random logo' src={logo} className={classes.logo} />
            {matches ? menuMobile : menuComp}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
      <RegisterForm
        setOpenModalReg={setOpenModalReg}
        openModalReg={openModalReg}
        classes={classes}
      />
      <LoginForm
        openModalLog={openModalLog}
        setOpenModalLog={setOpenModalLog}
        classes={classes}
      />
      {matches && logIn ? (
        <FabStyled
          sx={{
            display:
              window.location.pathname === '/createFlashcards'
                ? 'none'
                : 'block',
          }}
          // color='primary'
          id='fabAdd'
          aria-label='add'
          aria-controls='add-flashcard-menu-fab'
          aria-haspopup='true'
          aria-expanded={openFlashcard ? 'true' : undefined}
          onClick={handleClickFlashcardFAB}
        >
          <AddIcon />
        </FabStyled>
      ) : undefined}
      <StyledMenuFAB />
      <AddFolder
        setOpenAddFolderModal={setOpenAddFolderModal}
        openAddFolderModal={openAddFolderModal}
        classes={classes}
      />
    </>
  );
};

export default Header;
