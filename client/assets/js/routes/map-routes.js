const express = require('express');
const Profile = require("../controllers/map-controller.js");

const router = express.Router();

router.get('/map', Profile.getMap);
router.get('/map/user_map', Profile.getUserMap);
router.get('/map/driver_map', Profile.getDriverMap);
router.get('/map/order_map', Profile.getOrderMap);

module.exports = router