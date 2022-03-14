const express = require("express");
const mongoose = require("mongoose");
const dbConn = require("./db/dbConnect")
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

app.get("/", (req, res)=>{ res.send("Welcome at home page"); });

// app.post("/api/user/login", userLogin);
// app.post("/api/user/register", userRegister);

// //here for the images route
// app.post("/api/image/add", addImages);
// app.post("/api/image/delete/(:id)", deleteImage);
// app.get("/api/image/list", listImages);


app.listen("5000", ()=>{ console.log("server listen at 5000") });
