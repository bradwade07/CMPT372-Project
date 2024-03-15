const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const { helpers } = require('./models/db')

const port = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/backend", async (req, res) =>{
    try {
        var response = helpers.init();
        console.log("Tables created succesfully!");
        res.status(200).send("Tables created succesfully!");
      } catch (error) {
        await pool.query("ROLLBACK");
        console.error("Error creating tables:", error);
        res.status(500).send("Error creating tables");
      }
})
// app.get("/test", async (req, res) =>{
//     helpers.getProductInfoByPid(req, res);
    
// })

app.listen(port, "0.0.0.0");
console.log(`Running on http://0.0.0.0:${port}`);