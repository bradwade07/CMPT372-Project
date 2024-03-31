const {error} = require("console");
const {Pool} = require("pg");

var pool;

// pool = new Pool({
//   TODO: connection string
//   user: "postgres",
//   host: "db",
//   password: "root"
// });
pool = new Pool({
  //TODO: connection string
  user: "postgres",
  host: "localhost",
  password: "root",
  port: "5432"
});

const helpers = {
  init: async function () {
    await pool.query(`BEGIN`);
    await pool.query("CREATE TABLE IF NOT EXISTS address (address_id SERIAL PRIMARY KEY, street_name VARCHAR(255), city VARCHAR(255), province VARCHAR(255), post_code VARCHAR(255), country VARCHAR(255));");
    await pool.query("CREATE TABLE IF NOT EXISTS userinfo (user_email VARCHAR(255) PRIMARY KEY, address_id INTEGER, FOREIGN KEY (address_id) REFERENCES address(address_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS product (product_id SERIAL PRIMARY KEY, product_name VARCHAR(255), product_main_img BYTEA, product_description VARCHAR(255), product_date_added bigINT, user_email VARCHAR(255), product_avg_rating FLOAT, FOREIGN KEY (user_email) REFERENCES userInfo(user_email));");
    await pool.query("CREATE TABLE IF NOT EXISTS productprice (product_id INTEGER PRIMARY KEY, base_price FLOAT, current_price FLOAT, FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS tag (tag_id SERIAL PRIMARY KEY, tag_name VARCHAR(255));");
    await pool.query("CREATE TABLE IF NOT EXISTS producttags (product_id INTEGER, tag_id INTEGER, PRIMARY KEY (product_id, tag_id), FOREIGN KEY (product_id) REFERENCES product(product_id), FOREIGN KEY (tag_id) REFERENCES tag(tag_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS usertypes (type_id SERIAL PRIMARY KEY, type VARCHAR(255));");
    await pool.query("CREATE TABLE IF NOT EXISTS users (user_email VARCHAR(255) PRIMARY KEY, type_id INTEGER, FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (type_id) REFERENCES userTypes(type_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS userwishlist (user_email VARCHAR(255), product_id INTEGER, quantity INTEGER , PRIMARY KEY (user_email, product_id), FOREIGN KEY (user_email) REFERENCES userinfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS warehouse (warehouse_id SERIAL PRIMARY KEY, lat FLOAT, long FLOAT);");
    await pool.query("CREATE TABLE IF NOT EXISTS warehousestock (warehouse_id INTEGER, product_id INTEGER, PRIMARY KEY (warehouse_id, product_id), quantity INTEGER, FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS usercart (user_email VARCHAR(255), product_id INTEGER, quantity INTEGER, delivery BOOLEAN, warehouse_id INTEGER, PRIMARY KEY (user_email, product_id), FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id), FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS image (product_id INTEGER, image_id SERIAL, image BYTEA, PRIMARY KEY (product_id, image_id), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    const response = await pool.query(`SELECT * FROM usertypes;`);
    if (response.rows.length === 0) {
      await pool.query(`INSERT INTO usertypes (type) VALUES ('vendor');`);
      await pool.query(`INSERT INTO usertypes (type) VALUES ('customer');`);
      await pool.query(`INSERT INTO usertypes (type) VALUES ('admin');`);
    }
    await pool.query("CREATE TABLE IF NOT EXISTS review (review_id SERIAL, product_id INTEGER, user_email INTEGER, comment VARCHAR(255), PRIMARY KEY (review_id), FOREIGN KEY (user_email) REFERENCES userinfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS vendorrequest ( request_id SERIAL PRIMARY KEY, user_email VARCHAR(255), FOREIGN KEY (user_email) REFERENCES userinfo(user_email));");
    await pool.query(`COMMIT`);
  },

  insertTestData: async function () {
    //depricated and used for the users
    await pool.query(`BEGIN`);
    await pool.query("INSERT INTO address (street_name, city, province, post_code, country) VALUES ('123 Example Street', 'City', 'Province', 'PostalCode', 'Country');");
    await pool.query("INSERT INTO address (street_name, city, province, post_code, country) VALUES ('456 Another Road', 'City', 'Province', 'PostalCode', 'Country');");
    await pool.query("INSERT INTO userinfo (user_email, address_id) VALUES ('user1@example.com', 1);");
    await pool.query("INSERT INTO userinfo (user_email, address_id) VALUES ('user2@example.com', 2);");
    await pool.query(`INSERT INTO usertypes (type) VALUES ('vendor');`);
    await pool.query(`INSERT INTO usertypes (type) VALUES ('customer');`);
    await pool.query("INSERT INTO users (user_email, type_id) VALUES ('user1@example.com', 1);");
    await pool.query("INSERT INTO users (user_email, type_id) VALUES ('user2@example.com', 2);");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_avg_rating) VALUES ('Product A', 'imgsrcA.jpg', 'Description of product A.', 1617181920, 'user1@example.com', 1.0);");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_avg_rating) VALUES ('Product B', 'imgsrcB.jpg', 'Description of product B.', 1617181930, 'user1@example.com', 3.2);");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_avg_rating) VALUES ('Product C', 'imgsrcC.jpg', 'Description of product C.', 1617181940, 'user2@example.com', 1.1);");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_avg_rating) VALUES ('Product D', 'imgsrcD.jpg', 'Description of product D.', 1617181950, 'user2@example.com', 3.2);");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_avg_rating) VALUES ('Product E', 'imgsrcE.jpg', 'Description of product E.', 1617181960, 'user2@example.com', 4);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (1, 100.00, 90.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (2, 200.00, 180.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (3, 150.00, 145.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (4, 250.00, 230.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (5, 300.00, 280.00);");
    await pool.query(`INSERT INTO tag (tag_name) VALUES ('electronics');`);
    await pool.query(`INSERT INTO tag (tag_name) VALUES ('home');`);
    await pool.query(`INSERT INTO tag (tag_name) VALUES ('garden');`);
    await pool.query(`INSERT INTO tag (tag_name) VALUES ('fashion');`);
    await pool.query(`INSERT INTO tag (tag_name) VALUES ('toys');`);

    // Associating products with tags
    // Assuming product IDs 1 to 5 have been inserted as before
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (1, 1);"); // Product A is Electronics
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (2, 2);"); // Product B is Home
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (3, 3);"); // Product C is Garden
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (4, 4);"); // Product D is Fashion
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (5, 5);"); // Product E is Toys

    // Demonstrating products can have multiple tags
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (1, 2);"); // Product A also belongs to Home
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (2, 3);"); // Product B also belongs to Garden
    await pool.query("INSERT INTO producttags (product_id, tag_id) VALUES (3, 1);"); // Product C also belongs to Electronics

    //Inserting multiple items into user carts
    await pool.query("INSERT INTO usercart (user_email, product_id, quantity) VALUES ('user1@example.com', 1, 1);"); // User 1 adds Product A
    await pool.query("INSERT INTO usercart (user_email, product_id, quantity) VALUES ('user1@example.com', 3, 2);"); // User 1 adds 2 of Product C
    await pool.query("INSERT INTO usercart (user_email, product_id, quantity) VALUES ('user2@example.com', 2, 1);"); // User 2 adds Product B
    await pool.query("INSERT INTO usercart (user_email, product_id, quantity) VALUES ('user2@example.com', 5, 3);"); // User 2 adds 3 of Product E

    //Inserting items into user wishlists
    await pool.query("INSERT INTO userwishlist (user_email, product_id, quantity) VALUES ('user1@example.com', 4, 1);"); // User 1 wishes for Product D
    await pool.query("INSERT INTO userwishlist (user_email, product_id, quantity) VALUES ('user2@example.com', 1, 2);"); // User 2 wishes for Product A

    //Inserting multiple warehouses
    await pool.query("INSERT INTO warehouse (lat, long) VALUES (40.7128, -74.0060);"); // Warehouse 1 in New York
    await pool.query("INSERT INTO warehouse (lat, long) VALUES (34.0522, -118.2437);"); // Warehouse 2 in Los Angeles

    //Inserting warehouse stock accordingly
    await pool.query("INSERT INTO warehousestock (warehouse_id, product_id, quantity) VALUES (1, 1, 20);"); // 20 of Product A in Warehouse 1
    await pool.query("INSERT INTO warehousestock (warehouse_id, product_id, quantity) VALUES (1, 2, 15);"); // 15 of Product B in Warehouse 1
    await pool.query("INSERT INTO warehousestock (warehouse_id, product_id, quantity) VALUES (2, 3, 25);"); // 25 of Product C in Warehouse 2
    await pool.query("INSERT INTO warehousestock (warehouse_id, product_id, quantity) VALUES (2, 4, 10);"); // 10 of Product D in Warehouse 2
    await pool.query("INSERT INTO warehousestock (warehouse_id, product_id, quantity) VALUES (2, 5, 30);"); // 30 of Product E in Warehouse 2
    await pool.query(`COMMIT`);
    //////////////////////////
  },

  deleteTestData: async function () {
    try {
      await pool.query(`BEGIN`);

      // Delete data from tables with foreign key constraints first
      await pool.query(`DELETE FROM usercart;`);
      await pool.query(`DELETE FROM userwishlist;`);
      await pool.query(`DELETE FROM warehousestock;`);
      await pool.query(`DELETE FROM producttags;`);
      await pool.query(`DELETE FROM productprice;`);
      await pool.query(`DELETE FROM product;`);
      await pool.query(`DELETE FROM users;`);
      await pool.query(`DELETE FROM usertypes;`);
      await pool.query(`DELETE FROM userinfo;`);
      await pool.query(`DELETE FROM address;`);
      await pool.query(`DELETE FROM tag;`);
      await pool.query(`DELETE FROM warehouse;`);

      await pool.query(`COMMIT`);
      console.log("Test data and tables deleted successfully.");
    } catch (error) {
      await pool.query(`ROLLBACK`);
      console.error("Error deleting test data:", error);
      throw error;
    }
  },

  deleteAllTables: async function () {
    try {
      await pool.query(`BEGIN`);

      // Drop tables in reverse order of dependency
      await pool.query(`DROP TABLE IF EXISTS warehousestock CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS warehouse CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS userwishlist CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS users CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS usertypes CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS usercart CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS producttags CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS tag CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS productprice CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS product CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS userinfo CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS address CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS image CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS review CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS vendorrequest CASCADE;`);

      await pool.query(`COMMIT`);
      console.log("All tables deleted successfully.");
    } catch (error) {
      await pool.query(`ROLLBACK`);
      console.error("Error deleting tables:", error);
      throw error;
    }
  },

  getProductInfoByPid: async function (id) {
    try {
      const response = await pool.query(`SELECT * 
        FROM product 
        JOIN productprice ON product.product_id = productprice.product_id 
        WHERE product.product_id = $1;`, [id]);
      return response.rows;
    } catch (error) {
      console.error("Error retrieving product information:", error);
      throw error;
    }
  },

  getProductIdByName: async function (product_name) {
    try {
      let response;
      let queryStr = `SELECT product_id FROM product `;
      if (product_name !== "") {
        response = await pool.query((queryStr += `WHERE product_name = $1;`), [product_name]);
      } else {
        response = await pool.query((queryStr += `;`));
      }
      return response.rows;
    } catch (error) {
      console.error("Error in getProductIdByName:", error);
      throw error;
    }
  },

  getProductIdByRating: async function (product_rating_min, product_rating_max) {
    try {
      const response = await pool.query(`
          SELECT product_id 
          FROM product 
          WHERE product_avg_rating >= $1 AND product_avg_rating <= $2;
        `, [product_rating_min, product_rating_max]);
      return response.rows;
    } catch (error) {
      console.error("Error in getProductIdByRating:", error);
      throw error;
    }
  },

  getProductIdByPrice: async function (product_price_min, product_price_max) {
    try {
      const response = await pool.query(`
        SELECT product_id 
        FROM productprice 
        WHERE current_price >= $1 AND current_price <= $2;
      `, [product_price_min, product_price_max]);
      return response.rows;
    } catch (error) {
      console.error("Error in getProductIdByPrice:", error);
      throw error;
    }
  },

  getProductIdByDateAdded: async function (product_date_added_after, product_date_added_before) {
    try {
      const response = await pool.query(`
        SELECT product_id 
        FROM product 
        WHERE product_date_added >= $1 AND product_date_added <= $2;
      `, [product_date_added_after, product_date_added_before]);
      return response.rows;
    } catch (error) {
      console.error("Error in getProductIdByDateAdded:", error);
      throw error;
    }
  },

  getProductIdByUserEmail: async function (user_email) {
    try {
      let response;
      let queryStr = `SELECT product_id FROM product `;
      if (user_email !== "") {
        response = await pool.query((queryStr += `WHERE user_email = $1;`), [user_email]);
      } else {
        response = await pool.query((queryStr += `;`));
      }
      return response.rows;
    } catch (error) {
      console.error("Error in getProductIdByUserEmail:", error);
      throw error;
    }
  },

  getProductIdByTags: async function (tags) {
    try {
      const tagResponse = await pool.query("SELECT tag_id FROM tag WHERE tag_name = ANY($1);", [tags]);
      const tagIds = tagResponse.rows.map(row => row.tag_id);
      let productIds = [];
      for (const tagId of tagIds) {
        const response = await pool.query(`SELECT product_id FROM producttags WHERE tag_id = $1;`, [tagId]);
        response.rows.forEach(row => {
          if (!productIds.includes(row.product_id)) {
            productIds.push(row.product_id);
          }
        });
      }
      if (productIds.length > 0) {
        const response = await pool.query(`SELECT * FROM product WHERE product_id = ANY($1);`, [productIds]);
        return response.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error in getProductIdByTags:", error);
      throw error;
    }
  },

  getProductsOnSaleByLimit: async function (limit) {
    try {
      let query = `
        SELECT p.product_id, p.product_name, p.product_description, p.product_main_img, p.product_date_added, pp.base_price, pp.current_price
        FROM product p
        JOIN productprice pp ON p.product_id = pp.product_id
        WHERE pp.current_price < pp.base_price
        ORDER BY pp.current_price DESC
      `;
      if (limit >= 0) {
        query += ` LIMIT $1;`;
        const result = await pool.query(query, [limit]);
        return result.rows;
      } else {
        const result = await pool.query(query);
        return result.rows;
      }
    } catch (error) {
      console.error("Error retrieving products on sale:", error);
      throw error;
    }
  },

  getNewestProductsByLimit: async function (limit) {
    try {
      let query = `
        SELECT p.product_id, p.product_name, p.product_description, p.product_main_img, p.product_date_added, pp.base_price, pp.current_price
        FROM product p
        JOIN productprice pp ON p.product_id = pp.product_id
        ORDER BY p.product_date_added DESC
      `;
      if (limit >= 0) {
        query += ` LIMIT $1;`;
        const result = await pool.query(query, [limit]);
        return result.rows;
      } else {
        const result = await pool.query(query);
        return result.rows;
      }
    } catch (error) {
      console.error("Error retrieving newest products:", error);
      throw error;
    }
  },

  postUser: async function (street_name, city, province, post_code, country, user_email, type_id) {
    try {
      const address_id = await helpers.postAddress(street_name, city, province, post_code, country);
      await pool.query(`INSERT INTO userinfo (user_email, address_id) VALUES ($1, $2);`, [user_email, address_id]);
      await pool.query(`INSERT INTO users (user_email, type_id) VALUES ($1, $2);`, [user_email, type_id]);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  postAddress: async function (street_name, city, province, post_code, country) {
    try {
      const response = await pool.query(`INSERT INTO address (street_name, city, province, post_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING address_id;`, [street_name, city, province, post_code, country]);
      return response.rows[0].address_id;
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  },

  getUserTypeByUserEmail: async function (email) {
    try {
      await pool.query(`BEGIN`);
      const result = await pool.query(`SELECT users.type_id, usertypes.type FROM users 
        JOIN usertypes ON users.type_id = usertypes.type_id 
        WHERE user_email = $1;`, [email]);
      await pool.query(`COMMIT`);
      return result.rows;
    } catch (error) {
      await pool.query(`ROLLBACK`);
      console.error("Error retrieving user by email:", error);
      throw error;
    }
  },

  patchUserType: async function (user_email, type) {
    try {
      await pool.query(`UPDATE users SET type_id = $1 WHERE user_email = $2`, [type, user_email]);
    } catch (error) {
      console.error("Error updating user type:", error);
      throw error;
    }
  },

  patchUserAddress: async function (user_email, street_name, city, province, post_code, country) {
    try {
      const response = await pool.query(`INSERT INTO address (street_name, city, province, post_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING address_id;`, [street_name, city, province, post_code, country]);
      await pool.query(`UPDATE userInfo SET address_id = $1 WHERE user_email = $2;`, [
        response.rows[0].address_id,
        user_email
      ]);
    } catch (error) {
      console.error("Error updating user address:", error);
      throw error;
    }
  },

  postProductToUserWishlist: async function (user_email, product_id, quantity) {
    try {
      await pool.query(`INSERT INTO userwishlist (user_email, product_id, quantity) VALUES($1, $2, $3);`, [user_email, product_id, quantity]);
    } catch (error) {
      console.error("Error adding item to wish list:", error);
      throw error;
    }
  },

  getUserWishlistByUserEmail: async function (email) {
    try {
      const query = `
        SELECT 
            product.product_id, 
            product.product_name, 
            product.product_description, 
            product.product_main_img,
            productprice.base_price, 
            productprice.current_price, 
            userwishlist.quantity
        FROM product
        JOIN userwishlist ON product.product_id = userwishlist.product_id
        JOIN productprice ON product.product_id = productprice.product_id
        WHERE userwishlist.user_email = $1;
        `;
      const values = [email];
      const result = await pool.query(query, values);
      return result.rows.length
        ? result.rows
        : {
          message: "No products found in the user's wishlist"
        };
    } catch (error) {
      console.error("Error retrieving wish list products by email:", error);
      throw error;
    }
  },

  deleteUserWishlistByPidUserEmail: async function (user_email, product_id) {
    try {
      await pool.query("DELETE FROM userwishlist WHERE user_email = $1 AND product_id = $2", [user_email, product_id]);
    } catch (error) {
      console.error("Error removing item from wish list:", error);
      throw error;
    }
  },

  postProductToUserCart: async function (user_email, product_id, quantity) {
    try {
      await pool.query(`BEGIN`);
      const response = await pool.query(`SELECT * FROM usercart WHERE user_email = $1 AND product_id = $2;`, [user_email, product_id]);
      if (response.rows.length === 0) {
        await pool.query(`INSERT INTO usercart (user_email, product_id, quantity) VALUES($1, $2, $3);`, [user_email, product_id, quantity]);
      } else {
        await pool.query(`UPDATE usercart SET quantity = $1 WHERE user_email = $2 AND product_id = $3;`, [
          response.rows[0].quantity + quantity,
          user_email,
          product_id
        ], [user_email, product_id, quantity]);
      }
      await pool.query(`COMMIT`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },

  getUserCartByUserEmail: async function (email) {
    try {
      const query = `
        SELECT 
            product.product_id, 
            product.product_name, 
            product.product_description, 
            product.product_main_img,
            productprice.base_price, 
            productprice.current_price, 
            usercart.quantity
        FROM product
        JOIN usercart ON product.product_id = usercart.product_id
        JOIN productprice ON product.product_id = productprice.product_id
        WHERE usercart.user_email = $1;
        `;
      const values = [email];
      const result = await pool.query(query, values);
      return result.rows.length > 0
        ? result.rows
        : {
          message: "No products found in the user's cart"
        };
    } catch (error) {
      console.error("Error retrieving user cart by email:", error);
      throw error;
    }
  },

  deleteUserCartByPidUserEmail: async function (user_email, product_id) {
    try {
      await pool.query(`DELETE FROM usercart WHERE user_email = $1 AND product_id = $2 `, [user_email, product_id]);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },

  patchWarehouseStock: async function (warehouse_id, product_id, quantity) {
    try {
      let response = await pool.query(`SELECT quantity FROM warehousestock WHERE warehouse_id = $1 AND product_id = $2;`, [warehouse_id, product_id]);
      if (response.rows[0].quantity >= quantity) {
        await pool.query(`UPDATE warehousestock SET quantity = quantity - $3 WHERE warehouse_id = $1 AND product_id = $2;`, [warehouse_id, product_id, quantity]);
        return 1;
      }
      return 0;
    } catch (error) {
      console.error("Error adjusting warehouse stock:", error);
      throw error;
    }
  },
  createProductListing: async function (product_name, product_description, base_price, current_price, user_email, warehouse_ids, quantities, product_images) {
    try {
      const product_date_added = Math.floor(new Date().getTime() / 1000);
      await pool.query(`BEGIN`);
      response = await pool.query(`INSERT INTO product (product_name, product_main_img, product_description, product_date_added, user_email, product_avg_rating)
            VALUES ($1, $2, $3, $4, $5, $6) returning product_id;`, [
        product_name,
        product_images[0],
        product_description,
        new Date().getTime(),
        user_email,
        0.0
      ]);
      let product_id = response.rows[0].product_id;
      await pool.query(`INSERT INTO productprice (product_id, base_price, current_price)
            VALUES ($1, $2, $3);`, [product_id, base_price, current_price]);
      if (product_images.length > 1) {
        for (let i = 1; i < product_images.length; i++) {
          await pool.query(`INSERT INTO image (product_id, image)
                    VALUES ($1, $2);`, [
            product_id, product_images[i]
          ]);
        }
      }
      for (let i = 0; i < warehouse_ids.length; i++) {
        let response = await pool.query(`SELECT warehouse_id FROM warehouse WHERE warehouse_id = $1;`, [warehouse_ids[i]]);
        if (response.rows.length === 0) {
          throw new Error("Warehouse id not found");
        }
        await pool.query(`INSERT INTO warehousestock (warehouse_id, product_id, quantity)
                VALUES ($1, $2, $3);`, [
          warehouse_ids[i], product_id, quantities[i]
        ]);
      }
      await pool.query(`COMMIT`);
    } catch (error) {
      console.error("Error adjusting warehouse stock:", error);
      throw error;
    }
  },
  clearUserCart: async function (user_email) {
    try {
      await pool.query(`DELETE FROM usercart
            WHERE user_email = $1;`, [user_email]);
    } catch (error) {
      console.error("Error adjusting warehouse stock:", error);
      throw error;
    }
  },
  handleResponse: async function (response) {
    try {
      const jsonResponse = await response.json();
      return {jsonResponse, httpStatusCode: response.status};
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  },
  postReviewsByUserEmail: async function (product_id, user_email, comment) {
    try {
      const response = await pool.query(`SELECT * 
            FROM product
            WHERE user_email = $1;`, [user_email]);
      if (response.rows.length === 0) {
        await pool.query(`INSERT INTO review(product_id, user_email, comment)
                VALUES ($1, $2, $3);`, [product_id, user_email, comment]);
      }
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },
  postVendorRequestsByUserEmail: async function (user_email) {
    try {
      const response = await pool.query(`SELECT *
            FROM vendorrequest
            WHERE user_email = $1;`, [user_email]);
      if (response.rows.length === 0) {
        await pool.query(`INSERT INTO vendorrequest(user_email)
                VALUES ($1);`, [user_email]);
      }
    } catch (error) {
      console.error("Error creating vendor request:", error);
      throw error;
    }
  },
  getAllVendorRequests: async function () {
    try {
      const response = await pool.query(`SELECT *
            FROM vendorrequest;`);
      return response.rows;
    } catch (error) {
      console.error("Error creating vendor request:", error);
      throw error;
    }
  },
  getAllActiveVendorRequests: async function () {
    try {
      const response = await pool.query(`SELECT *
            FROM vendorrequest
            WHERE approve;`);
      return response.rows;
    } catch (error) {
      console.error("Error creating vendor request:", error);
      throw error;
    }
  }
};

module.exports = {
  helpers
};