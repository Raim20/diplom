const multer = require("multer");
const moment = require("moment");
const fs = require("fs");
const saveDataToJsonFile = require("./saveToJson");

const createDirectoryIfNotExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true }); // Создаем папку и все несуществующие директории рекурсивно
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { userId } = req.user;
        const destinationPath = `assets/data/avatar/${userId}`;
        createDirectoryIfNotExists(destinationPath);
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const date = moment().format("DDMMYYYY-HHmmss_SSS")
        const fileName = `avatar-${req.user.userId}-${date}.${file.originalname.split(".").pop()}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const limits = {
    fileSize: 5 * 1024 * 1024
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});