const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const { helpers } = require('./models/db');



const port = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Welcome to Our API!');
  });
  


app.get('/landingBackend', async (req, res) =>{
    try{
    helpers.init(req, res);
    helpers.landingBackendFn(req, res);
    }catch(error){
        console.error('Error in /landingBackend endpoint:', error)
        res.status(500).send('Internal Server error')
    }
    
})
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
        const users = await helpers.checkUserByEmail(userEmail);
        console.log(users);
        if (users && users.length > 0){
            res.status(200).json({ userType: users[0].type });
        }else{
            res.status(400).json('User not found');
        }
    }catch(error){
        console.error('Error retrieving user info:', error);
        res.status(500).send('Server error');
    }
});

//hello everyone this is to test, nothing else
app.get('/testCartProducts', async (req, res) => {
    const userEmail = 'test@example.com'; // Change to a relevant email
    try {
        const products = await helpers.getCartProductsByEmail(userEmail);
        console.log(products);
        if (products && products.length > 0) {
            res.json(products); 
        } else {
            res.status(404).json({ message: 'No products found in the user\'s cart' });
        }
    } catch(error) {
        console.error('Error retrieving cart products:', error);
        res.status(500).send('Server error');
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
app.get('/wishListProducts', async (req, res) => {
    const userEmail = req.query.email;
    if (!userEmail) {
        return res.status(400).send('Email is required');
    }
    try {
        const prodInfo = await helpers.getWishListProductsByEmail(userEmail);
        if (prodInfo.length > 0) {
            res.json(prodInfo);
        } else {
            res.status(404).json('No products found in the user\'s wish list');
        }
    } catch (error) {
        console.error('Error retrieving wish list products:', error);
        res.status(500).send('Server error');
    }
});
app.get('/productsOnSale', async (req, res) => {
    console.log('Accessing /productsOnSale');
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    try {
        
        const products = await helpers.getProductsOnSale(limit);
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products on sale found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while getting products on sale');
    }
});



app.get('/newestProducts', async (req, res) => {
    console.log('Accessing /newestProducts');
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null; 
    try {
        const products = await helpers.getNewestProducts(limit);
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No newest products found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while getting newest products');
    }
});


// app.get('/productsOnSale', async (req, res) => {
//     console.log('Accessing /productsOnSale');
//     res.send('Route is accessible');
// });




app.get('/favicon.ico', (req, res) => res.status(204));

app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
  });
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
