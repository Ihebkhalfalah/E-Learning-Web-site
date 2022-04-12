const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");


const userRoute = require('./routes/userrouter.js');
const courseRoute = require('./routes/courserouter.js');
const categoryRoute = require('./routes/categoryrouter.js');


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true 
  }

mongoose.connect('mongodb://127.0.0.1:27017/Iheb',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));
app.use('/users', userRoute)
app.use('/courses', courseRoute)
app.use('/category', categoryRoute)





const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// //Error Handling
// app.use((req, res, next) => {
//     next(createError(404));
// });

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

