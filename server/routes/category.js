const express = require('express');
const router = express.Router();

// Validators
const {categoryCreateValidator, categoryUpdateValidator} = require('../validators/category');
const {runValidation} = require('../validators');

//Controllers: make sure user has logged in
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {create, list, read, update, remove} = require('../controllers/category')


//routes
router.post("/category", categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get("/categories", list);
router.post("/category/:slug", read);
router.put("/category/:slug", categoryUpdateValidator, runValidation, requireSignin, adminMiddleware, update);
router.delete("/category/:slug", runValidation, requireSignin, adminMiddleware, remove);

module.exports = router;