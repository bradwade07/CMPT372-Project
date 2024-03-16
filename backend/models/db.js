const {Pool} = require("pg");

const pool = new Pool({
  user: process.env.POOL_USER,
  host: process.env.POOL_HOST,
  database: process.env.POOL_DATABASE,
  password: process.env.POOL_PASSWORD,
  port: 5432,
});

const helpers = {
  init: async function () {
    await pool.query("BEGIN");
    await pool.query("CREATE TABLE IF NOT EXISTS userinfo (user_email VARCHAR(255) PRIMARY KEY, user_address TEXT);");
    await pool.query("CREATE TABLE IF NOT EXISTS product (product_id SERIAL PRIMARY KEY, product_name VARCHAR(255), product_imgsrc VARCHAR(255), product_description VARCHAR(255), product_date_added bigINT, user_email VARCHAR(255), product_rating FLOAT, FOREIGN KEY (user_email) REFERENCES userInfo(user_email));");
    await pool.query("CREATE TABLE IF NOT EXISTS productprice (product_id INTEGER PRIMARY KEY, base_price FLOAT, current_price FLOAT, FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS tag (tag_id SERIAL PRIMARY KEY, tag_name VARCHAR(255));");
    await pool.query("CREATE TABLE IF NOT EXISTS producttags (product_id INTEGER, tag_id INTEGER, PRIMARY KEY (product_id, tag_id), FOREIGN KEY (product_id) REFERENCES product(product_id), FOREIGN KEY (tag_id) REFERENCES tag(tag_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS usercart (user_email VARCHAR(255), product_id INTEGER, quantity INTEGER, PRIMARY KEY (user_email, product_id), FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS usertypes (type_id SERIAL PRIMARY KEY, type VARCHAR(255));");
    await pool.query("CREATE TABLE IF NOT EXISTS users (user_email VARCHAR(255), type_id INTEGER, PRIMARY KEY (user_email, type_id), FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (type_id) REFERENCES userTypes(type_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS userwishlist (user_email VARCHAR(255), product_id INTEGER, PRIMARY KEY (user_email, product_id), FOREIGN KEY (user_email) REFERENCES userinfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("CREATE TABLE IF NOT EXISTS warehouse (warehouse_id SERIAL PRIMARY KEY, lat FLOAT, long FLOAT);");
    await pool.query("CREATE TABLE IF NOT EXISTS warehousestock (warehouse_id INTEGER, product_id INTEGER, PRIMARY KEY (warehouse_id, product_id), stock INTEGER, FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id), FOREIGN KEY (product_id) REFERENCES product(product_id));");
    await pool.query("COMMIT");
    //TODO: remove testing
    {
      await pool.query("BEGIN");
      await pool.query("INSERT INTO userinfo (user_email, user_address) VALUES ('user1@example.com', '123 Example Street, City, Country');");
      await pool.query("INSERT INTO userinfo (user_email, user_address) VALUES ('user2@example.com', '456 Another Road, City, Country');");
      await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_rating) VALUES ('Product A', 'imgsrcA.jpg', 'Description of product A.', 1617181920, 'user1@example.com', 1.0);");
      await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_rating VALUES ('Product B', 'imgsrcB.jpg', 'Description of product B.', 1617181930, 'user1@example.com', 3.2);");
      await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_rating) VALUES ('Product C', 'imgsrcC.jpg', 'Description of product C.', 1617181940, 'user2@example.com', 1.1);");
      await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_rating) VALUES ('Product D', 'imgsrcD.jpg', 'Description of product D.', 1617181950, 'user2@example.com', 3.2);");
      await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email, product_rating) VALUES ('Product E', 'imgsrcE.jpg', 'Description of product E.', 1617181960, 'user2@example.com', 4);");
      await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (1, 100.00, 90.00);");
      await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (2, 200.00, 180.00);");
      await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (3, 150.00, 145.00);");
      await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (4, 250.00, 230.00);");
      await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (5, 300.00, 280.00);");
      await pool.query("INSERT INTO tag (tag_name) VALUES ('Electronics');");
      await pool.query("INSERT INTO tag (tag_name) VALUES ('Home');");
      await pool.query("INSERT INTO tag (tag_name) VALUES ('Garden');");
      await pool.query("INSERT INTO tag (tag_name) VALUES ('Fashion');");
      await pool.query("INSERT INTO tag (tag_name) VALUES ('Toys');");
  
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
      await pool.query("COMMIT");
      //////////////////////////
    }
  }
};
module.exports = { helpers };
