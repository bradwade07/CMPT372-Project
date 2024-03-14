const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const { helpers } = require('./models/db')


const port = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/landingBackend', async (req, res) =>{
    try{
    helpers.init(req, res);
    helpers.landingBackendFn(req, res);
    }catch(error){
        console.error('Error in /landingBackend endpoint:', error)
        res.status(500).send('Internal Server error')
    }
    
})
app.get('/checkUser', async(req,res) => {
    const userEmail = req.query.email; //as written on discord Body: user email
    if(!userEmail){
        return res.status(400).send('Email is required');
    }
    try{
        const users = await checkUserByemail(userEmail);
        if(users.length > 0){
            res.status(200).json({ userType: users[0].type });
        }else{
            res.status(200).json({userType : users[0].type});
        }
    }catch(error){
        console.error('Error user', user);
        res.status(500).send('Server error')
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
