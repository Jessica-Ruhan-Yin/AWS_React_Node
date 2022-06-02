const express = require('express');
const router = express.Router();

// Validators
const {linkCreateValidator, linkUpdateValidator} = require('../validators/link');
const {runValidation} = require('../validators');

//Controllers: make sure user has logged in
const {requireSignin, authMiddleware} = require('../controllers/auth');
const {create, list, read, update, remove, clickCount} = require('../controllers/link')


//routes
router.post("/link", linkCreateValidator, runValidation, requireSignin, authMiddleware, create);
router.get("/links", list);
router.put("/click-count", clickCount);
router.get("/link/:slug", read);
router.put("/link/:slug", linkUpdateValidator, runValidation, requireSignin, authMiddleware, update);
router.delete("/link/:slug", runValidation, requireSignin, authMiddleware, remove);

module.exports = router;