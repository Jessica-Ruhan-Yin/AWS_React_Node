const express = require('express');
const router = express.Router();

// Validators
const {linkCreateValidator, linkUpdateValidator} = require('../validators/link');
const {runValidation} = require('../validators');

//Controllers: make sure user has logged in
const {requireSignin, authMiddleware, adminMiddleware, canUpdateOrDeleteLink} = require('../controllers/auth');
const {create, list, read, update, remove, clickCount} = require('../controllers/link')


//routes
router.post('/link', linkCreateValidator, runValidation, requireSignin, authMiddleware, create);
router.post('/links', requireSignin, adminMiddleware, list);
router.put('/click-count', clickCount);
router.get('/link/:id', read);
router.put('/link/:id', linkUpdateValidator, runValidation, requireSignin, authMiddleware, canUpdateOrDeleteLink, update);
router.put('link/admin/:id', linkUpdateValidator, runValidation, requireSignin, adminMiddleware, update);
router.delete('/link/:id', requireSignin, authMiddleware, canUpdateOrDeleteLink, remove);
router.delete('/link/admin/:id', requireSignin, adminMiddleware, remove);


module.exports = router;