const express = require('express');
const Basket = require("../controllers/basket-controller.js");

const router = express.Router();

router.get('/basket', Basket.getAllBasket);
//router.get('/basket/:id', Basket.getById);

module.exports = router;