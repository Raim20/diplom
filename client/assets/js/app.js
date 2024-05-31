const express = require("express")
const morgan = require("morgan")
const createPath = require("./static_functions/create-path.js")
const regRoutes = require("./routes/reg-routes.js")
const orderRoutes = require("./routes/order-routes.js")
const basketRoutes = require("./routes/basket-routes.js")
const profileRoutes = require("./routes/profile-routes.js")
const mapRoutes = require("./routes/map-routes.js")
const mapRoutes1 = require("./routes/admin-routes.js")

const app = express();

app.set('view engine', 'ejs');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('assets/css'));
app.use(express.static('assets/rsc'));
app.use(express.static('assets/js'));

// app.get('/', (req, res) => {
//     const title = 'Home';
//     res.render(createPath('/reg'), { title });
// });

// app.get('/index', (req, res) => {
//     const title = 'Home';
//     res.render(createPath('/reg'), { title });
// });

// app.get('/about', (req, res) => {
//     const title = 'About';
//     res.render(createPath('about'), { title });
// });

// app.get('/map', (req, res) => {
//     const title = 'Test';
//     res.render(createPath('map'), { title });
// });

// app.get('/map_1', (req, res) => {
//     const title = 'Test';
//     res.render(createPath('map_3 copy'), { title });
// });

// app.get('/map_2', (req, res) => {
//     const title = 'Test';
//     res.render(createPath('map_2'), { title });
// });

// app.get('/map_3', (req, res) => {
//     const title = 'Test';
//     res.render(createPath('map_3'), { title });
// });

// app.get('/map_taxi', (req, res) => {
//     const title = 'Test';
//     res.render(createPath('map_taxi'), { title });
// });

app.get('/map', (req, res) => {
    const title = 'Test';
    res.render(createPath('map_taxi_final'), { title });
});

app.get('/driver_map', (req, res) => {
    const title = 'Test';
    res.render(createPath('driver_map_final'), { title });
});

// app.get('/driver_map', (req, res) => {
//     const title = 'Test';
//     res.render(createPath('driver_map'), { title });
// });

app.use(regRoutes);
app.use(orderRoutes);
app.use(basketRoutes);
app.use(profileRoutes);
app.use(mapRoutes);
app.use(mapRoutes1);


app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title });
});

module.exports = app