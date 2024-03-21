const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');
const { helpers } = require('./models/db')

const port = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/landingBackend", async (req, res) =>{
    helpers.init(req, res);
    helpers.landingBackendFn(req, res);

})