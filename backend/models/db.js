const {Pool} = require("pg");

var pool;

pool = new Pool({
  //TODO: connection string
  user: "postgres",
  host: "db",
  password: "root"
});

const helpers = {
  init: async function (req, res) {
    try {
        await pool.query("BEGIN")
        await pool.query("CREATE TABLE IF NOT EXISTS product (product_id SERIAL PRIMARY KEY, product_name VARCHAR(255), product_imgsrc VARCHAR(255), product_description VARCHAR(255), product_date_added bigINT, user_email VARCHAR(255), FOREIGN KEY (user_email) REFERENCES userInfo(user_email));");
        await pool.query("CREATE TABLE IF NOT EXISTS productprice (product_id INTEGER PRIMARY KEY, base_price FLOAT, current_price FLOAT, FOREIGN KEY (product_id) REFERENCES product(product_id));");
        await pool.query("CREATE TABLE IF NOT EXISTS tag (tag_id SERIAL PRIMARY KEY, tag_name VARCHAR(255));");
        await pool.query("CREATE TABLE IF NOT EXISTS producttags (product_id INTEGER, tag_id INTEGER, PRIMARY KEY (product_id, tag_id), FOREIGN KEY (product_id) REFERENCES product(product_id), FOREIGN KEY (tag_id) REFERENCES tag(tag_id));");
        await pool.query("CREATE TABLE IF NOT EXISTS userInfo (user_email VARCHAR(255) PRIMARY KEY, user_address TEXT);");
        await pool.query("CREATE TABLE IF NOT EXISTS usercart (user_email VARCHAR(255), product_id INTEGER, quantity INTEGER, PRIMARY KEY (user_email, product_id), FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id));");
        await pool.query("CREATE TABLE IF NOT EXISTS usertypes (type_id SERIAL PRIMARY KEY, type VARCHAR(255));");
        await pool.query("CREATE TABLE IF NOT EXISTS users (user_email VARCHAR(255), type_id INTEGER, PRIMARY KEY (user_email, type_id), FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (type_id) REFERENCES userTypes(type_id));");
        await pool.query("CREATE TABLE IF NOT EXISTS userwishlist (user_email VARCHAR(255), product_id INTEGER, PRIMARY KEY (user_email, product_id), FOREIGN KEY (user_email) REFERENCES userInfo(user_email), FOREIGN KEY (product_id) REFERENCES product(product_id));");
        await pool.query("CREATE TABLE IF NOT EXISTS warehouse (warehouse_id SERIAL PRIMARY KEY, lat FLOAT, long FLOAT);");
        await pool.query("CREATE TABLE IF NOT EXISTS warehousestock (warehouse_id INTEGER, product_id INTEGER, PRIMARY KEY (warehouse_id, product_id), stock INTEGER, FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id), FOREIGN KEY (product_id) REFERENCES product(product_id));");
        await pool.query("COMMIT")
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error creating tables:", error);
      res.status(500);
    }
  },
  landingBackendFn: async function(req, res){

  }
};
module.exports = { helpers };
