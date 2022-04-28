const router = require('express').Router();
const userController = require('../controllers/user');
const flashcardController = require('../controllers/flashcard');

const {
  verifyUserToken,
  IsUser,
  userEvent,
  IsAdmin,
  adminEvent,
  verifyUserTokenReload,
} = require('../middleware/auth');

const { rts, login } = userController;
const {
  addFolder,
  editFolder,
  removeFolder,
  getFolder,
  getUserFolders,
  addSet,
  editSet,
  removeSet,
  getSet,
  getUserSets,
  addFlashcard,
  editFlashcard,
  removeFlashcard,
  getFlashcard,
} = flashcardController;

router.get('/events', verifyUserToken, IsUser, userEvent);
router.get('/special', verifyUserToken, IsAdmin, adminEvent);

router.post('/register', rts);
router.post('/login', login);

router.post('/createFolder', verifyUserToken, addFolder);
router.post('/editFolder', verifyUserToken, editFolder);
router.post('/remoeFolder', verifyUserToken, removeFolder);
router.post('/getFolder', verifyUserToken, getFolder);
router.post('/getUserFolders', verifyUserToken, getUserFolders);

router.post('/createSet', verifyUserToken, addSet);
router.post('/editSet', verifyUserToken, editSet);
router.post('/removeSet', verifyUserToken, removeSet);
router.get('/getSet/:id', verifyUserToken, getSet);
router.post('/getUserSets', verifyUserToken, getUserSets);

router.post('/createFlashcard', verifyUserToken, addFlashcard);
router.post('/editFlashcard', verifyUserToken, editFlashcard);
router.post('/removeFlashcard', verifyUserToken, removeFlashcard);
router.post('/getFlashcard', verifyUserToken, getFlashcard);

router.post('/verifyToken', verifyUserTokenReload);

module.exports = router;
