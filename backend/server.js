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
            res.status(400).json('User not found');
        }
    }catch(error){
        console.error('Error user', user);
        res.status(500).send('Server error')
    }
});
app.get('/cartProducts', async (req,res) => {
    const userEmail = req.query.email; //as written on discord Body: user email
    if(!userEmail){
        return res.status(400).send('Email is required');
    }
    try{
        const prodInfo = await getCartProductsByEmail(userEmail);
        if(prodInfo.length > 0){
            const responseObject = {
                userEmail : userEmail,
                itemCount: cartProducts.length,
                items: cartProducts.map(product => ({
                    productId: product.product_id,
                    productName: product.product_name,
                    productDescription: product.product_description,
                    productImage: product.product_imgsrc,
                    basePrice: product.base_price, // Assuming these fields exist in product object
                    currentPrice: product.current_price, // Assuming discount or sale price
                    quantity: product.quantity, // Assuming you join with a table that includes quantity
                    totalPrice: product.current_price * product.quantity, // Calculate total price
                    inStock: product.in_stock, // Stock availability
                    tags: product.tags 
                }))
            };
            res.status(200).json(responseObject);
        }else{
            res.status(400).json('No products found in the user\'s shopping cart');
        }
    }catch(error){
        console.error('Error retrieving cart products:', error);
        res.status(500).send('Server error');
    }
}),
app.get('/wishListProducts', async (req,res) => {
    const userEmail = req.query.email; //as written on discord Body: user email
    if(!userEmail){
        return res.status(400).send('Email is required');
    }
    try{
        const prodInfo = await getWishListProductsByEmail(userEmail);
        if(prodInfo.length > 0){
            const responseObject = {
             
                    userEmail: userEmail,
                    itemCount: wishlistProducts.length,
                    items: wishlistProducts.map(product => ({
                      productId: product.product_id,
                      productName: product.product_name,
                      productDescription: product.product_description,
                      productImage: product.product_imgsrc,
                      productDateAdded : product_date_added 
                    }))
            };
            res.status(200).json(responseObject);
        }else{
            res.status(400).json('No products found in the user\'s shopping cart');
        }
    }catch(error){
        console.error('Error retrieving cart products:', error);
        res.status(500).send('Server error');
    }
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
