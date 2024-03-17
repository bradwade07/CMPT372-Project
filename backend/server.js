const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const { helpers, connectWithConnector } = require('./models/db')

const port = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.post("/backend", async (req, res) => {
    try {
      const pool = await connectWithConnector();
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

// Route for adding a new user
app.post('/addUser', async (req, res) => {

  const { userEmail, userType } = req.body;
  try {
    await helpers.addUser(userEmail, userType);
    res.status(201).json({ message: 'New user added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for updating user type
app.patch('/updateUserType', async (req, res) => {

  const { userEmail, userType } = req.body;
  try {
    await helpers.updateUserType(userEmail, userType);
    res.status(200).json({ message: 'User type updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for updating user address
app.patch('/updateUserAddress', async (req, res) => {

  const { userEmail, streetAddress, postalCode, city, province } = req.body;
  try {
    await helpers.updateUserAddress(userEmail, streetAddress, postalCode, city, province);
    res.status(200).json({ message: 'User address updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
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


app.delete('/cart', async (req, res) => {

  const { userEmail, pid } = req.body;
  try {
    await helpers.removeFromCart(userEmail, pid);
    res.status(200).json({ message: 'Item removed from shopping cart successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/wishlist', async (req, res) => {

  const { userEmail, pid } = req.body;
  try {
    await helpers.removeFromWishList(userEmail, pid);
    res.status(200).json({ message: 'Item removed from wish list successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  
