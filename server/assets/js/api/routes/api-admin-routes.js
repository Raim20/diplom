const express = require('express');
const Admin = require("../controllers/api-admin-controller.js");
const upload_img = require("../middleware/upload_game_img.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/api/admin', Admin.getData);
router.get('/api/admin/edit/:id_of_game', Admin.getEditData);
router.put('/api/admin/edit/:id_of_game', Admin.editData);
router.post('/api/admin/create', Admin.createData);
router.post('/api/admin/create/genre', Admin.create_data);
router.post('/api/admin/create/data_of_site', Admin.create_data_of_site);
router.get('/api/admin/genre', Admin.getGenre);
router.post('/api/admin/img/:id_of_game', upload_img.single("img"), Admin.uploadImg);
router.delete('/api/admin/img/:id_of_game', Admin.deleteImg);

module.exports = router;

// const img_src = files.server_api_url + "/" + items[item].id_of_game.replace('#', '') + "/" + items[item].img;
