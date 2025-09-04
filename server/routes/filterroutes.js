const express = require('express');
const filcon = require('../controllers/filterControllers');

const router = express.Router();


router.get("/category", filcon.showCategories);
router.get("/category/:category", filcon.categoriesitem);
router.get("/isveg/:type", filcon.filterby);


module.exports = router;