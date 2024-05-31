const express = require('express');
// const Map = require("../controllers/api-map-controller.js");
const Map = require("../controllers/api-map-controller_final.js");
// const Map = require("../controllers/api-map-controller_copy_2.js");
//const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware.js")
const router = express.Router();

// router.get('/api/map', Map.getMap);
router.post('/api/map', Map.getMap);
router.post('/api/map/route_data_send', Map.getMap);

// router.get('/api/map/user_location', Map.getUserLocation);
// router.post('/api/map/user_location', Map.createUserLocation);
// router.put('/api/map/user_location', Map.editUserLocation);
// router.patch('/api/map/user_location', Map.editUserLocation);
// router.get('/api/map/driver_location', Map.getDriverLocation);
// router.post('/api/map/driver_location', Map.createDriverLocation);
// router.put('/api/map/driver_location', Map.editDriverLocation);
// router.patch('/api/map/driver_location', Map.editDriverLocation);

// router.get('/api/map', authMiddleware, Map.getAllBasket);
// router.get('/api/map/:id_of_game', authMiddleware, Map.getById);
// router.delete('/api/map/:id_of_game', authMiddleware, Map.remove);
// router.patch('/api/map/', authMiddleware, Map.validateOrder);


module.exports = router;