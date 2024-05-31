const express = require('express');
const Order = require("../controllers/api-order-controller.js");
// const upload = require("../middleware/upload.js");
//const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware.js");
const authMiddleware_2 = require("../middleware/authMiddleware_2.js");
const router = express.Router();

// router.get('/api/order/confirmed_order', authMiddleware, Order.getConfirmedOrder);
// router.post('/api/order/confirmed_order', authMiddleware, Order.createConfirmedOrder);
// router.get('/api/order/current_order', authMiddleware, Order.getCurrentOrder);
// router.post('/api/order/current_order', authMiddleware, Order.createCurrentOrder);
// router.get('/api/order/current_user_order', authMiddleware, Order.getCurrentUserOrder);
// router.post('/api/order/current_user_order', authMiddleware, Order.createCurrentUserOrder);

router.post('/api/order/get_fare_current_user_order', authMiddleware_2, Order.createFareCurrentUserOrder);
// router.get('/api/order/get_nearby_orders', authMiddleware, Order.getNearbyOrders);
router.get('/api/order/get_nearby_orders', authMiddleware_2, Order.getNearbyOrders);

router.get('/api/order/confirmed_order', authMiddleware_2, Order.getConfirmedOrder);
router.post('/api/order/confirmed_order', authMiddleware_2, Order.createConfirmedOrder);
router.get('/api/order/current_order', authMiddleware_2, Order.getCurrentOrder);
router.post('/api/order/current_order', authMiddleware_2, Order.createCurrentOrder);
router.get('/api/order/current_user_order', authMiddleware_2, Order.getCurrentUserOrder);
router.post('/api/order/current_user_order', authMiddleware_2, Order.createCurrentUserOrder);
router.post('/api/order/upload_current_user_order', authMiddleware_2, Order.uploadCurrentUserOrder);

module.exports = router;