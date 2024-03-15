const {Pool} = require("pg");

var pool;

pool = new Pool({
  //TODO: connection string
  user: "postgres",
  host: "db",
  password: "root"
});

const helpers = {
  init: async function () {
    await pool.query("BEGIN");
    await pool.query("CREATE TABLE IF NOT EXISTS userinfo (user_email VARCHAR(255) PRIMARY KEY, user_address TEXT);");
    await pool.query("CREATE TABLE IF NOT EXISTS product (product_id SERIAL PRIMARY KEY, product_name VARCHAR(255), product_imgsrc VARCHAR(255), product_description VARCHAR(255), product_date_added bigINT, user_email VARCHAR(255), FOREIGN KEY (user_email) REFERENCES userInfo(user_email));");
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
    await pool.query("BEGIN");
    await pool.query("INSERT INTO userinfo (user_email, user_address) VALUES ('user1@example.com', '123 Example Street, City, Country');");
    await pool.query("INSERT INTO userinfo (user_email, user_address) VALUES ('user2@example.com', '456 Another Road, City, Country');");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email) VALUES ('Product A', 'imgsrcA.jpg', 'Description of product A.', 1617181920, 'user1@example.com');");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email) VALUES ('Product B', 'imgsrcB.jpg', 'Description of product B.', 1617181930, 'user1@example.com');");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email) VALUES ('Product C', 'imgsrcC.jpg', 'Description of product C.', 1617181940, 'user2@example.com');");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email) VALUES ('Product D', 'imgsrcD.jpg', 'Description of product D.', 1617181950, 'user2@example.com');");
    await pool.query("INSERT INTO product (product_name, product_imgsrc, product_description, product_date_added, user_email) VALUES ('Product E', 'imgsrcE.jpg', 'Description of product E.', 1617181960, 'user2@example.com');");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (1, 100.00, 90.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (2, 200.00, 180.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (3, 150.00, 145.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (4, 250.00, 230.00);");
    await pool.query("INSERT INTO productprice (product_id, base_price, current_price) VALUES (5, 300.00, 280.00);");
    await pool.query("COMMIT");
    //////////////////////////
  },
//   getProductInfoByPid: async function (req, res) {
//     const product_id = req.body.product_id;
//     const reply = [];
//     try {
//       // Check for non-positive product_id
//       if (product_id <= 0) {
//         console.error("Error: Invalid product_id");
//         return res.status(400).json({error: "Invalid product_id"});
//       }
//       const response = await pool.query("SELECT * FROM product JOIN productprice ON product.product_id = productprice.product_id WHERE product.product_id = $1;", [product_id]);
//       if (response.rows.length === 0) {
//         console.error("Product not found");
//         return res.status(404).json({error: "Product not found"});
//       } else {
//         reply.push({
//           product_id: response.rows[0].product_id,
//           product_name: response.rows[0].product_name,
//           product_imgsrc: response.rows[0].product_imgsrc,
//           product_description: response.rows[0].product_description,
//           product_date_added: response.rows[0].product_date_added,
//           user_email: response.rows[0].user_email,
//           base_price: response.rows[0].base_price,
//           current_price: response.rows[0].current_price
//         });
//         console.log("Product ID: " + response.rows[0].product_id + ", Product Name: " + response.rows[0].product_name + " returned successfully!");
//         return res.status(200).json(reply);
//       }
//     } catch (error) {
//       console.error("Error getting product:", error);
//       return res.status(500).json({error: "Internal server error"});
//     }
//   }
};
module.exports = {
  helpers
};
