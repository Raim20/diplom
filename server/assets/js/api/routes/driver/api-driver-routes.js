const express = require('express');
const Driver = require("../controllers/driver/api-driver-controller.js");
// const upload = require("../middleware/upload.js");
//const passport = require("passport");
const authMiddleware = require("../../middleware/authMiddleware.js");
const authMiddleware_2 = require("../../middleware/authMiddleware_2.js")
const router = express.Router();

router.get('/api/map/driver_location', authMiddleware, Driver.getDriverLocation);
router.get('/api/map/drivers_locations', authMiddleware, Driver.getDriversLocations);
router.post('/api/map/driver_location', authMiddleware, Driver.createDriverLocation);
router.put('/api/map/driver_location', authMiddleware, Driver.editDriverLocation);
router.patch('/api/map/driver_location', authMiddleware, Driver.editDriverLocation);

router.get('/api/driver/driver_current_location', authMiddleware, Driver.getDriverCurrentLocation);
router.put('/api/driver/driver_current_location', authMiddleware, Driver.updateDriverCurrentLocation);

module.exports = router;