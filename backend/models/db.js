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
        await pool.query("CREATE TABLE IF NOT EXISTS products (pid SERIAL PRIMARY KEY, pname VARCHAR(255), pimgsrc VARCHAR(255), pdesc VARCHAR(255), padded bigINT, uemail VARCHAR(255), FOREIGN KEY (uemail) REFERENCES userInfo(uemail));");
        await pool.query("CREATE TABLE IF NOT EXISTS productprice (pid INTEGER PRIMARY KEY, baseprice FLOAT, currentprice FLOAT, FOREIGN KEY (pid) REFERENCES products(pid));");
        await pool.query("CREATE TABLE IF NOT EXISTS tags (tid SERIAL PRIMARY KEY, tname VARCHAR(255));");
        await pool.query("CREATE TABLE IF NOT EXISTS producttags (pid INTEGER, tid INTEGER, PRIMARY KEY (pid, tid), FOREIGN KEY (pid) REFERENCES products(pid), FOREIGN KEY (tid) REFERENCES tags(tid));");
        await pool.query("CREATE TABLE IF NOT EXISTS userInfo (uemail VARCHAR(255) PRIMARY KEY, uaddress TEXT);");
        await pool.query("CREATE TABLE IF NOT EXISTS usercart (uemail VARCHAR(255), pid INTEGER, quantity INTEGER, PRIMARY KEY (uemail, pid), FOREIGN KEY (uemail) REFERENCES userInfo(uemail), FOREIGN KEY (pid) REFERENCES products(pid));");
        await pool.query("CREATE TABLE IF NOT EXISTS usertypes (typeId SERIAL PRIMARY KEY, type VARCHAR(255));");
        await pool.query("CREATE TABLE IF NOT EXISTS users (uemail VARCHAR(255), typeid INTEGER, PRIMARY KEY (uemail, typeid), FOREIGN KEY (uemail) REFERENCES userInfo(uemail), FOREIGN KEY (typeid) REFERENCES userTypes(typeid));");
        await pool.query("CREATE TABLE IF NOT EXISTS userwishlist (uemail VARCHAR(255) PRIMARY KEY, pid INTEGER, FOREIGN KEY (uemail) REFERENCES userInfo(uemail), FOREIGN KEY (pid) REFERENCES products(pid));");
        await pool.query("CREATE TABLE IF NOT EXISTS warehouses (wid SERIAL PRIMARY KEY, lat FLOAT, long FLOAT);");
        await pool.query("CREATE TABLE IF NOT EXISTS warehousestock (wid INTEGER, pid INTEGER, PRIMARY KEY (wid, pid), stock INTEGER, FOREIGN KEY (wid) REFERENCES warehouses(wid), FOREIGN KEY (pid) REFERENCES products(pid));");
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
