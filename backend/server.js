const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const { helpers, pool } = require('./models/db')

const port = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.post("/backend", async (req, res) => {
    try {
      var response = helpers.init();
      console.log("Success: Tables created succesfully!");
      res.status(200).send("Success: Tables created succesfully!");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error: Failed to create tables.", error);
      res.status(500).send("Error: Failed to create tables.");
    }
  });

app.get("/landingBackend", async (req, res) =>{

    helpers.init(req, res);
    helpers.landingBackendFn(req, res);

})

//test function
app.get('/test', async (req, res) => {
  try {
    const pool = await connectWithConnector();
    res.send('success');
  } catch (error) { 
    console.error('Error connecting to the database:', error);
    res.status(500).send('Internal Server Error');
  }
});




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  
