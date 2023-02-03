const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const productRoutes = require("./routes/Product.route.js");

const port = process.env.PORT || 3000;

//DB connection
require('./initDB')();

//middleware functions.
app = express();
app.use(express.json());
app.use(morgan("short"));
app.use("/", productRoutes);


app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});