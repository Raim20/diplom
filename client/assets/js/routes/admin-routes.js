const express = require('express');
const Admin = require("../controllers/admin-controller.js");

const router = express.Router();

router.get('/admin', Admin.getData);
router.get('/admin/edit/:id_of_game', Admin.editData);
// router.get('/admin/edit/:id_of_game', Admin.getEditData);
// router.put('/admin/edit/:id_of_game', Admin.editData);
router.get('/admin/create', Admin.createData);

module.exports = router;