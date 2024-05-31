const express = require('express');
const Data = require("../controllers/api-site-data-controller.js");
const upload_img = require("../middleware/upload_game_img.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/api/data/language', Data.getLanguage);
router.get('/api/data/platform', Data.getPlatform);
router.get('/api/data/genre', Data.getGenre);

module.exports = router;

// const img_src = files.server_api_url + "/" + items[item].id_of_game.replace('#', '') + "/" + items[item].img;
