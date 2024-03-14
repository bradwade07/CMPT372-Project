const express = require('express');
const bodyParser = require('body-parser');
const { helpers } = require('../models/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
