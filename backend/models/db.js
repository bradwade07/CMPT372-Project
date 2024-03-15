const {Pool} = require("pg");

//var pool;

const pool = new Pool({
  user: 'ashrafulislam',
  host: 'localhost',
  database: 'project',
  port: 5432,
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

  },
  checkUserByEmail: async function(email){
    try{
      await pool.query("BEGIN")
      const result = await pool.query(
        
        `SELECT users.type_id, usertypes.type FROM users 
        JOIN usertypes ON users.type_id = usertypes.type_id 
        WHERE user_email = $1`, [email]
        
      );
    //  const result = await pool.query("SELECT * FROM userInfo WHERE user_email = $1", [email]);
      await pool.query("COMMIT")
      return result.rows;
    }catch(error){
      await pool.query("ROLLBACK");
      
    }
  },
  getCartProductsByEmail: async(email) => {
    try {
      await pool.query("BEGIN");
      const query = `
    SELECT 
        product.product_id, 
        product.product_name, 
        product.product_description, 
        product.product_imgsrc, 
        productprice.base_price, 
        productprice.current_price, 
        usercart.quantity,
        (productprice.current_price * usercart.quantity) AS total_price,
        warehousestock.stock AS in_stock -- Corrected column alias
    FROM 
        product
    JOIN 
        usercart ON product.product_id = usercart.product_id
    JOIN 
        productprice ON product.product_id = productprice.product_id
    LEFT JOIN 
        warehousestock ON product.product_id = warehousestock.product_id -- Join condition corrected
    WHERE 
        usercart.user_email = $1;  
`;
      const values = [email];
      const result = await pool.query(query, values);
      await pool.query("COMMIT");
  
      if (result.rows.length === 0) {
        return [{ message: "No products found in the user's cart" }];
      }
  
      console.log("Query result:", result.rows);
      return result.rows;
    } catch(error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  },
  getWishListProductsByEmail: async (email) => {
    try {
        await pool.query("BEGIN");
        
        const query = `
        SELECT product.* FROM product
        JOIN userwishlist ON product.product_id = userwishlist.product_id
        WHERE userwishlist.user_email = $1

        `;
        
       // const values = [email];
       const values = [email.trim()]; // Trim the email before using it

      
        const result = await pool.query(query, values); 
        await pool.query("COMMIT");
        return result.rows;
      
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error("Error retrieving wish list products:", error);
        throw error; 
    }
},
getProductsOnSale: async (limit) => {
  
  let query = `
    SELECT p.product_id, p.product_name, p.product_description, pp.base_price, pp.current_price
    FROM product p
    JOIN productprice pp ON p.product_id = pp.product_id
    WHERE pp.current_price < pp.base_price
    ORDER BY pp.current_price DESC
  `;


  if (limit !== null) {
    query += ` LIMIT $1`;
    try {
      const result = await pool.query(query, [limit]);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving products on sale:", error);
      throw error;
    }
  } else {
  
    try {
      const result = await pool.query(query); 
      return result.rows;
    } catch (error) {
      console.error("Error retrieving products on sale:", error);
      throw error;
    }
  }
}


};



module.exports = { helpers };
