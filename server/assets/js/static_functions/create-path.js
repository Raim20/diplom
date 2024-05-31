//import path from "path";
const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../../html-ejs', `${page}.ejs`);

module.exports = createPath;