const express = require('express');
const Store = require("../controllers/order-controller.js");

const router = express.Router();

router.get('/order', Store.getOrder);
router.get('/game/:id_of_game', Store.getGame);

module.exports = router;