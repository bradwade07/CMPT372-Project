const express = require("express");
const cors = require("cors");
const { helpers } = require("./models/db");
const fetch = require("node-fetch");
require("dotenv").config(); // allows using the environment variables from .env file
const upload = require("express-fileupload");

const app = express();
const port = 8080;
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const paypal_base = "https://api-m.sandbox.paypal.com";

app.use(upload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Testing related endpoints
app.post("/insertTestData", async (req, res) => {
  //testing
  try {
    helpers.insertTestData();
    console.log("Success: Data inserted succesfully!");
    return res.status(201).send("Success: Data inserted succesfully!");
  } catch (error) {
    console.error("Error: Data Not Inserted.", error);
    return res.status(500).send("Error: Data Not Inserted.");
  }
});

app.delete("/deleteAllTables", async (req, res) => {
  //testing
  try {
    helpers.deleteAllTables();
    console.log("Success: Tables deleted succesfully!");
    return res.status(201).send("Success: Tables deleted succesfully!");
  } catch (error) {
    console.error("Error: Tables Not deleted.", error);
    return res.status(500).send("Error: Tables Not deleted.");
  }
});

// Products related endpoints
app.get("/getProduct/:product_id", async (req, res) => {
  if (!req.params.product_id) {
    return res.status(400).send({ error: "Invalid product id!" });
  }
  let product_id = parseInt(req.params.product_id);

  try {
    // Check for non-positive product_id
    if (product_id <= 0) {
      return res.status(400).send({ error: "Invalid Product ID!" });
    }
    const response = await helpers.getProductInfoByPid(product_id);
    if (response.length === 0) {
      return res.status(404).send({ error: "Product not found!" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).send({ error: "Server failed to get product!" });
  }
});

app.get("/getProductsByFilters", async (req, res) => {
  const product_name = req.query.product_name
    ? req.query.product_name.trim()
    : "";
  const product_avg_rating_min =
    req.query.product_avg_rating_min !== undefined &&
    req.query.product_avg_rating_min !== ""
      ? parseInt(req.query.product_avg_rating_min)
      : 0.0;
  const product_avg_rating_max =
    req.query.product_avg_rating_max !== undefined &&
    req.query.product_avg_rating_max !== ""
      ? parseInt(req.query.product_avg_rating_max)
      : 5.0;
  const current_price_min =
    req.query.current_price_min !== undefined &&
    req.query.current_price_min !== ""
      ? parseInt(req.query.current_price_min)
      : 0.0;
  const current_price_max =
    req.query.current_price_max !== undefined &&
    req.query.current_price_max !== ""
      ? parseInt(req.query.current_price_max)
      : 2147483647; // SQL MAX INT
  const product_date_added_before =
    req.query.product_date_added_before !== undefined &&
    req.query.product_date_added_before !== ""
      ? parseInt(req.query.product_date_added_before)
      : new Date().getTime();
  const product_date_added_after =
    req.query.product_date_added_after !== undefined &&
    req.query.product_date_added_after !== ""
      ? parseInt(req.query.product_date_added_after)
      : 0;
  const tags = req.query.tags ? req.query.tags.trim().split(",") : [];
  const user_email = req.query.user_email ? req.query.user_email.trim() : "";

  let responseIds = [];
  try {
    let response = await helpers.getProductIdByName(product_name);
    response.forEach((row) => {
      responseIds.push(row.product_id);
    });

    response = await helpers.getProductIdByRating(
      product_avg_rating_min,
      product_avg_rating_max,
    );
    let tempRows = response.map((row) => row.product_id);
    responseIds = responseIds.filter((id) => tempRows.includes(id));

    response = await helpers.getProductIdByPrice(
      current_price_min,
      current_price_max,
    );
    tempRows = response.map((row) => row.product_id);
    responseIds = responseIds.filter((id) => tempRows.includes(id));

    response = await helpers.getProductIdByDateAdded(
      product_date_added_after,
      product_date_added_before,
    );
    tempRows = response.map((row) => row.product_id);
    responseIds = responseIds.filter((id) => tempRows.includes(id));

    response = await helpers.getProductIdByUserEmail(user_email);
    tempRows = response.map((row) => row.product_id);
    responseIds = responseIds.filter((id) => tempRows.includes(id));

    if (tags.length > 0) {
      response = await helpers.getProductIdByTags(tags);
      tempRows = response.map((row) => row.product_id);
      responseIds = responseIds.filter((id) => tempRows.includes(id));
    }

    let reply = [];
    for (id of responseIds) {
      response = await helpers.getProductInfoByPid(id);
      if (response.active === true) {
        reply.push({
          product_id: response.product_id,
          product_name: response.product_name,
          product_main_img: response.product_main_img.toString("base64"),
          product_description: response.product_description,
          product_date_added: response.product_date_added,
          product_avg_rating: response.product_avg_rating,
          user_email: response.user_email,
          base_price: response.base_price,
          current_price: response.current_price,
          tags: response.tags,
          additional_img: response.additional_img,
          active: response.active,
        });
      }
    }
    return res.status(200).send(reply);
  } catch (error) {
    return res.status(500).send({ error: "Server failed to get products!" });
  }
});

app.get("/getProductsOnSaleByLimit/:limit", async (req, res) => {
  const limit = req.params.limit ? parseInt(req.params.limit) : -1; //-1 is unlimited
  try {
    const products = await helpers.getProductsOnSaleByLimit(limit);
    if (products.length > 0) {
      res.json(products);
    } else {
      return res.status(404).json({ error: "Products not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server failed to get products!" });
  }
});

app.get("/getNewestProductsByLimit/:limit", async (req, res) => {
  const limit = req.params.limit ? parseInt(req.params.limit) : -1; //-1 is unlimited
  try {
    const products = await helpers.getNewestProductsByLimit(limit);
    if (products.length > 0) {
      res.json(products);
    } else {
      return res.status(404).json({ error: "Products not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server failed to get products!" });
  }
});

// User info related endpoints
app.post("/postUser", async (req, res) => {
  let {
    street_name,
    city,
    province,
    post_code,
    country,
    user_email,
    user_type,
  } = req.body;
  let addressGiven = 1;
  if (!user_email) {
    return res.status(400).send({ error: "Invalid user email!" });
    user_email = user_email.trim();
  }
  if (!street_name || !city || !province || !post_code || !country) {
    addressGiven = 0;
  } else {
    street_name = street_name.trim();
    city = city.trim();
    province = province.trim();
    post_code = post_code.trim();
    country = country.trim();
  }
  if (!user_type) return res.status(400).send({ error: "Invalid type!" });
  user_type = user_type.trim().toLowerCase();

  if (user_type !== "customer" && user_type !== "vendor") {
    return res.status(400).send({ error: "Invalid type2!" });
  }

  let type_id = user_type === "vendor" ? 1 : 2;

  try {
    await helpers.postUser(
      street_name,
      city,
      province,
      post_code,
      country,
      user_email,
      type_id,
      addressGiven,
    );
    return res.status(201).json({ success: "Product added successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server failed to add user!" });
  }
});

app.get("/getUserTypeByUserEmail/:user_email", async (req, res) => {
  if (!req.params.user_email.trim())
    return res.status(400).send({ error: "Invalid user email!" });
  let user_email = req.params.user_email.trim();

  try {
    const users = await helpers.getUserTypeByUserEmail(user_email);
    if (users.length > 0) {
      return res.status(200).json({ type: users[0].type });
    } else {
      return res.status(404).send({ error: "User not found!" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Server failed to get user!" });
  }
});

app.patch("/patchUserType", async (req, res) => {
  let { user_email, user_type } = req.body;
  if (!user_email) {
    return res.status(400).send({ error: "Invalid user email!" });
  }
  user_email = user_email.trim();

  if (!user_type) {
    return res.status(400).send({ error: "Invalid type!" });
  }
  user_type = user_type.trim().toLowerCase();

  if (user_type !== "customer" && user_type !== "vendor") {
    return res.status(400).send({ error: "Invalid type2!" });
  }

  let type_id = user_type === "vendor" ? 1 : 2;

  try {
    await helpers.patchUserType(user_email, type_id);
    return res
      .status(200)
      .json({ success: "User type modified successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Server failed to modify user type!" });
  }
});

app.patch("/patchUserAddress", async (req, res) => {
  let { user_email, street_name, city, province, post_code, country } =
    req.body;

  if (!user_email)
    return res.status(400).send({ error: "Invalid user email!" });
  user_email = user_email.trim();

  if (!street_name)
    return res.status(400).send({ error: "Invalid street name!" });
  street_name = street_name.trim();

  if (!city) return res.status(400).send({ error: "Invalid city!" });
  city = city.trim();

  if (!province) return res.status(400).send({ error: "Invalid province!" });
  province = province.trim();

  if (!post_code) return res.status(400).send({ error: "Invalid post code!" });
  post_code = post_code.trim();

  if (!country) return res.status(400).send({ error: "Invalid country!" });
  country = country.trim();

  try {
    await helpers.patchUserAddress(
      user_email,
      street_name,
      city,
      province,
      post_code,
      country,
    );
    return res
      .status(200)
      .send({ success: "User address modified successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ error: "Server failed to modify user address!" });
  }
});

// User wishlist related endpoints
app.post("/postProductToUserWishlist", async (req, res) => {
  let { user_email, product_id, quantity } = req.body;

  if (!user_email)
    return res.status(400).send({ error: "Invalid user email!" });
  user_email = user_email.trim();

  product_id = parseInt(product_id);
  quantity = parseInt(quantity);

  try {
    await helpers.postProductToUserWishlist(user_email, product_id, quantity);
    return res
      .status(200)
      .send({ success: "Item added to user wishlist successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ error: "Server failed to add product to the user wishlist!" });
  }
});

app.get("/getUserWishlistByUserEmail/:user_email", async (req, res) => {
  if (!req.params.user_email.trim())
    return res.status(400).send({ error: "Invalid user email!" });
  let user_email = req.params.user_email.trim();

  try {
    const products = await helpers.getUserWishlistByUserEmail(user_email);
    res.json(products);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Server failed to get user wishlist!" });
  }
});

app.delete("/deleteUserWishlistByPidUserEmail", async (req, res) => {
  let { user_email, product_id } = req.body;

  if (!user_email)
    return res.status(400).send({ error: "Invalid user email!" });
  user_email = user_email.trim();

  product_id = parseInt(product_id);

  try {
    await helpers.deleteUserWishlistByPidUserEmail(user_email, product_id);
    return res
      .status(200)
      .send({ success: "Item removed from user wishlist successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ error: "Server failed to delete product from user wishlist!" });
  }
});

// User shopping cart related endpoints
app.post("/postProductToUserCart", async (req, res) => {
  let { user_email, product_id, quantity, delivery, warehouse_id } = req.body;

  if (!user_email)
    return res.status(400).send({ error: "Invalid user email!" });
  user_email = user_email.trim();

  product_id = parseInt(product_id);
  quantity = parseInt(quantity);

  try {
    await helpers.postProductToUserCart(
      user_email,
      product_id,
      quantity,
      delivery,
      warehouse_id,
    );
    return res
      .status(200)
      .send({ success: "Item added to user cart successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ error: "Server failed to add product to the user cart!" });
  }
});

app.get("/getUserCartByUserEmail/:user_email", async (req, res) => {
  if (!req.params.user_email.trim())
    return res.status(400).send({ error: "Invalid user email!" });
  let user_email = req.params.user_email.trim();

  try {
    const products = await helpers.getUserCartByUserEmail(user_email);
    res.json(products);
  } catch (error) {
    return res.status(500).send({ error: "Server failed to get user cart!" });
  }
});

app.delete("/deleteUserCartByPidUserEmail", async (req, res) => {
  let { user_email, product_id } = req.body;

  if (!user_email)
    return res.status(400).send({ error: "Invalid user email!" });
  user_email = user_email.trim();

  product_id = parseInt(product_id);

  try {
    await helpers.deleteUserCartByPidUserEmail(user_email, product_id);
    return res
      .status(200)
      .send({ success: "Item removed from user cart successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ error: "Server failed to delete prodcut from user cart!" });
  }
});

// Warehouse related endpoints
app.patch("/patchWarehouseStock", async (req, res) => {
  let { warehouse_id, product_id, quantity } = req.body;

  if (!warehouse_id)
    return res.status(400).send({ error: "Invalid warehouse id!" });
  warehouse_id = parseInt(warehouse_id);

  if (!product_id)
    return res.status(400).send({ error: "Invalid product id!" });
  product_id = parseInt(product_id);

  if (!quantity) return res.status(400).send({ error: "Invalid quantity!" });
  quantity = parseInt(quantity);

  try {
    const response = await helpers.patchWarehouseStock(
      warehouse_id,
      product_id,
      quantity,
    );
    if (response === 1) {
      return res
        .status(200)
        .send({ success: "Warehouse quantity modified successfully!" });
    }
    return res
      .status(400)
      .json({ error: "Warehouse quantity is less than desired quantity!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Server failed to modify warehouse quantity!" });
  }
});

// Paypal functions and endpoints
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${paypal_base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (user_email) => {
  const total = await helpers.getOrderTotal(user_email);
  const accessToken = await generateAccessToken();
  const url = `${paypal_base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "CAD",
          value: total.toFixed(2).toString(),
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return helpers.handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${paypal_base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return helpers.handleResponse(response);
};

app.post("/api/orders", async (req, res) => {
  try {
    const { user_email, acquisitionMethod } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(
      user_email,
      acquisitionMethod,
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { user_email } = req.body;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    if (httpStatusCode === 201) {
      await helpers.addCartItemsToOrderInfoTable(orderID, user_email);
      await helpers.clearUserCart(user_email);
    }
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.post("/createProductListing", async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      base_price,
      current_price,
      user_email,
    } = req.body;
    let product_images = [];
    let warehouse_ids = [];
    let quantities = [];
    let product_tags = [];
    req.files["product_images[]"].forEach((obj) => {
      product_images.push(obj.data);
    });
    req.body["warehouse_ids[]"].forEach((id) => {
      warehouse_ids.push(parseInt(id));
    });
    req.body["quantities[]"].forEach((quantity) => {
      quantities.push(parseInt(quantity));
    });
    req.body["product_tags[]"].forEach((tag) => {
      product_tags.push(tag);
    });
    product_images.pop();
    warehouse_ids.pop();
    quantities.pop();
    product_tags.pop();
    await helpers.createProductListing(
      product_name,
      product_description,
      base_price,
      current_price,
      user_email,
      warehouse_ids,
      quantities,
      product_images,
      product_tags,
    );
    console.log("Product Created Successfully!");
    res.status(200);
  } catch (error) {
    console.error("Failed to create product:", error);
    res.status(500).json({ error: "Failed to create product." });
  }
});

app.post("/postVendorRequestsByUserEmail", async (req, res) => {
  try {
    const { user_email } = req.body;
    await helpers.postVendorRequestsByUserEmail(user_email);
    console.log("Vendor Request Posted Successfully!");
    res.status(200);
  } catch (error) {
    console.error("Failed to post vendor request:", error);
    res.status(500).json({ error: "Failed to post vendor request." });
  }
});

app.get("/getAllVendorRequests", async (req, res) => {
  try {
    const response = await helpers.getAllVendorRequests();
    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to get all vendor request:", error);
    res.status(500).json({ error: "Failed to get all vendor request." });
  }
});

app.delete("/deleteVendorRequestByUserEmail", async (req, res) => {
  try {
    const { user_email } = req.body;
    await helpers.deleteVendorRequestByUserEmail(user_email);
    console.log("Vendor Request Deleted Successfully!");
    res.status(200);
  } catch (error) {
    console.error("Failed to delete vendor request:", error);
    res.status(500).json({ error: "Failed to delete vendor request." });
  }
});

app.get("/getInStockWarehouses/:product_id/:quantity", async (req, res) => {
  try {
    const { product_id, quantity } = req.params;
    const response = await helpers.getInStockWarehouses(product_id, quantity);
    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to get warehouse stock:", error);
    res.status(500).json({ error: "Failed to get warehouse stock." });
  }
});

app.get("/getWarehouseInfo/:warehouse_id", async (req, res) => {
  try {
    const { warehouse_id } = req.params;
    const response = await helpers.getWarehouseInfo(warehouse_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to get warehouse info:", error);
    res.status(500).json({ error: "Failed to get warehouse info." });
  }
});

app.get("/getAllWarehouseInfo", async (req, res) => {
  try {
    const response = await helpers.getAllWarehouseInfo();
    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to get All warehouse info:", error);
    res.status(500).json({ error: "Failed to All get warehouse info." });
  }
});

app.get("/getAllProductTags", async (req, res) => {
  try {
    const tags = await helpers.getAllProductTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to fetch product tags" });
  }
});

app.delete("/deleteProductListingByProductId", async (req, res) => {
  try {
    const { product_id } = req.body;
    await helpers.deleteProductListingByProductId(product_id);
    res.status(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to delete product listing" });
  }
});

app.get("/getOrderHistoryByEmail/:user_email", async (req, res) => {
  try {
    const { user_email } = req.params;
    const history = await helpers.getOrderHistoryByEmail(user_email);
    res.status(200).json(history);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to get order History" });
  }
});
app.patch("/updateProductPriceByProductId", async (req, res) => {
  try {
    const { product_id, new_price } = req.body;
    await helpers.updateProductPriceByProductId(product_id, new_price);
    res.status(200);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ error: "Failed updating product price in productprice table" });
  }
});

// Server initialization
try {
  helpers.init().then(() => {
    console.log("Success: Tables created succesfully!");
    app.listen(port, "0.0.0.0");
    console.log(`Running on http://0.0.0.0:${port}`);
  });
} catch (error) {
  console.error("Error: Failed to create tables.", error);
}
