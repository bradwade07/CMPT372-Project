const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const {helpers} = require("./models/db");

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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
app.get("/getProduct/:product_id", async (req, res) => { 
  const product_id = parseInt(req.params.product_id);
  const reply = [];
  try {
    // Check for non-positive product_id
    if (product_id <= 0) {
      console.error("Error: Invalid product_id");
      return res.status(400).send("Error: Invalid product_id");
    }
    const response = await helpers.getProductInfoByPid(product_id);
    if (response.length === 0) {
      console.error("Error: Product not found");
      return res.status(404).send("Error: Product not found");
    } else {
      reply.push({
        product_id: response.product_id,
        product_name: response.product_name,
        product_imgsrc: response.product_imgsrc,
        product_description: response.product_description,
        product_date_added: response.product_date_added,
        user_email: response.user_email,
        base_price: response.base_price,
        current_price: response.current_price
      });
      console.log("Product ID: " + response.product_id + ", Product Name: " + response.product_name + " returned successfully!");
      return res.status(200).json(reply);
    }
  } catch (error) {
    console.error("Error: Failed to get product.", error);
    return res.status(500).send("Error: Failed to get product.");
  }
});

//GET /getProduct?tags=tag1,tag2,tag3&minPrice=100&maxPrice=500&minRating=4

app.get("/getProductsByFilters", async (req, res) => { //TODO: error handling
  const product_name = req.query.product_name || "";
  const product_avg_rating_min = req.query.product_avg_rating_min !== undefined && req.query.product_avg_rating_min !== '' ? parseInt(req.query.product_avg_rating_min) : 0.0;
  const product_avg_rating_max = req.query.product_avg_rating_max !== undefined && req.query.product_avg_rating_max !== '' ? parseInt(req.query.product_avg_rating_max) : 5.0;
  const current_price_min = req.query.current_price_min !== undefined && req.query.current_price_min !== '' ? parseInt(req.query.current_price_min) : 0.0;
  const current_price_max = req.query.current_price_max !== undefined && req.query.current_price_max !== '' ? parseInt(req.query.current_price_max) : 2147483647; // SQL MAX INT
  const product_date_added_before = req.query.product_date_added_before !== undefined && req.query.product_date_added_before !== '' ? parseInt(req.query.product_date_added_before) : new Date().getTime();
  const product_date_added_after = req.query.product_date_added_after !== undefined && req.query.product_date_added_after !== '' ? parseInt(req.query.product_date_added_after) : 0;
  const tagsString = req.query.tags.toLowerCase();
  const tags = tagsString ? tagsString.split(",") : [];
  const user_email = req.query.user_email || "";

  let responseIds = [];
  try{
    let response = await helpers.getProductIdByName(product_name);
    response.forEach(row =>{
      responseIds.push(row.product_id);
    });

    response = await helpers.getProductIdByRating(product_avg_rating_min, product_avg_rating_max);
    let tempRows = response.map(row => row.product_id);
    responseIds = responseIds.filter(id => tempRows.includes(id));
  
    response = await helpers.getProductIdByPrice(current_price_min, current_price_max);
    tempRows = response.map(row => row.product_id);
    responseIds = responseIds.filter(id => tempRows.includes(id));
  
    response = await helpers.getProductIdByDateAdded(product_date_added_after, product_date_added_before);
    tempRows = response.map(row => row.product_id);
    responseIds = responseIds.filter(id => tempRows.includes(id));;
  
    response = await helpers.getProductIdByUserEmail(user_email);
    tempRows = response.map(row => row.product_id);
    responseIds = responseIds.filter(id => tempRows.includes(id));
    
    if(tags.length > 0){
        response = await helpers.getProductIdByTags(tags);
        tempRows = response.map(row => row.product_id);
        responseIds = responseIds.filter(id => tempRows.includes(id));
    }
    
  
    const reply = [];
    for(id of responseIds){
      response = await helpers.getProductInfoByPid(id);
          response.forEach(row =>{
          reply.push({
              product_id: row.product_id,
              product_name: row.product_name,
              product_imgsrc: row.product_imgsrc,
              product_description: row.product_description,
              product_date_added: row.product_date_added,
              product_avg_rating: row.product_avg_rating,
              user_email: row.user_email,
              base_price: row.base_price,
              current_price: row.current_price
          })
      })
    }
    
    res.status(200).json(reply);
  } catch(error){
    console.error("Error processing request:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, "0.0.0.0");
console.log(`Running on http://0.0.0.0:${port}`);