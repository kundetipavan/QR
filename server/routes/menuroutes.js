const express = require('express');
const menucon = require('../controllers/menuControllers');

const router = express.Router();


router.get("/menu", menucon.showitems);
router.get("/menu/:id", menucon.itemsId);

module.exports = router;