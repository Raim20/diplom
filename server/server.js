require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mapApiRoutes = require("./assets/js/api/routes/api-map-routes.js");
const userProfileApiRoutes = require("./assets/js/api/routes/user/api-user-profile-routes.js");
const userRegistrationApiRoutes = require("./assets/js/api/routes/user/api-user-reg-routes.js");
const driverProfileApiRoutes = require("./assets/js/api/routes/driver/api-driver-profile-routes.js");
const driverRegistrationApiRoutes = require("./assets/js/api/routes/driver/api-driver-reg-routes.js");
const orderApiRoutes = require("./assets/js/api/routes/api-order-routes.js");
// const ApiRoutes = require("./assets/js/api/routes/.js");
const createPath = require("./assets/js/static_functions/create-path.js");

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.set('view engine', 'ejs');

const port = process.env.PORT || 5000;
const db = 'mongodb+srv://29152:raimmega02@mygamedata.xuxojsc.mongodb.net/my_game_data?retryWrites=true&w=majority&appName=MyGameData'
// const db = 'mongodb+srv://29152:raimmega02@cluster0.xxy3ajy.mongodb.net/data_of_store?retryWrites=true&w=majority';
// mongodb+srv://29152:<password>@mygamedata.xuxojsc.mongodb.net/?retryWrites=true&w=majority&appName=MyGameData
mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));


app.listen(port, (error) => {
    error ? console.log(error) : console.log(`listening port ${port}`);
});

app.use((req, res, next) => {
    console.log(`path: ${req.path}`);
    console.log(`method: ${req.method}`);
    next();
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
// require("./assets/js/middleware/passport")

app.use(express.static('assets/css'));
app.use(express.static('assets/rsc'));
app.use(express.static('assets/js'));
//app.use("/uploads", express.static('uploads'));
app.use(express.static('assets/data/avatar'));
app.use(express.static('assets/data/game_img'));
app.use(express.static('assets/data/uploads'));
//app.use(express.static('static'));

app.use(mapApiRoutes);
app.use(userProfileApiRoutes);
app.use(userRegistrationApiRoutes);
app.use(driverProfileApiRoutes);
app.use(driverRegistrationApiRoutes);
app.use(orderApiRoutes);


app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title });
});