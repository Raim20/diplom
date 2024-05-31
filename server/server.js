require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser")
const passport = require("passport");
// const regApiRoutes = require("./assets/js/api/routes/api-reg-routes.js");
// const storeApiRoutes = require("./assets/js/api/routes/api-store-routes.js");
// const basketApiRoutes = require("./assets/js/api/routes/api-basket-routes.js");
// const profileApiRoutes = require("./assets/js/api/routes/api-profile-routes.js");
// const adminApiRoutes = require("./assets/js/api/routes/api-admin-routes.js");
// const dataApiRoutes = require("./assets/js/api/routes/api-site-data-routes.js");
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
app.use(cookieParser())
app.use(cors())
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

// app.use(regApiRoutes);
// app.use(storeApiRoutes);
// app.use(basketApiRoutes);
// app.use(profileApiRoutes);
// app.use(adminApiRoutes);
// app.use(dataApiRoutes);
app.use(mapApiRoutes);
app.use(userProfileApiRoutes);
app.use(userRegistrationApiRoutes);
app.use(driverProfileApiRoutes);
app.use(driverRegistrationApiRoutes);
app.use(orderApiRoutes);

// const mapboxgl = require('mapbox-gl');
// const MAPBOX_API_KEY = 'pk.eyJ1IjoicmFpbW1lZ2EiLCJhIjoiY2x2NDlndGJoMDZtZzJpcjJkaWNrdDVsOSJ9.Y9he5g5b_LeHk8qXQgtnnA';

// app.get('/map', (req, res) => {
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [37.6155, 55.752],
//         zoom: 12
//     });

//     res.send(map);
// });

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title });
});












/*
app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('../../index'), { title });
});

app.get('/index', (req, res) => {
    const title = 'Home';
    res.render(createPath('../../index'), { title });
});

app.get('/about', (req, res) => {
    const title = 'About';
    res.render(createPath('about'), { title });
});

app.use(regRoutes);
app.use(storeRoutes);
app.use(basketRoutes);
app.use(profileRoutes);*/












/*
app.post('/reg', (req, res) => {
    const { name, email, password, re_enter_password } = req.body;
    const add_user = new Add_user({ name, email, password, re_enter_password });
    add_user
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        });
    res.send(req.body);
});*/


/*
app.post('/reg/signin', (req, res) => {
    const { email, password } = req.body;
    //const user = new Find_user({ email, password });
    Add_user
        .find({ email: email })
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        });
    //res.send(req.body);
});
*/
/*
app.post('/login',  (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new Add_user.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'User logged in successfully' });
        res.send(user);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
        //res.render(createPath('error'), { title: 'Error' });
    }
});*/

/*
app.post('/login', (req, res) => {
    try {
        const { name, email, password, re_enter_password } = req.body;
        if (!validate(name, email, password, re_enter_password)) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const existingUser = new Add_user.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const add_user = new Add_user({ name, email, password });
        add_user
            .save()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});*/