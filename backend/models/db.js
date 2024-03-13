const {Pool} = require("pg");

var pool;

pool = new Pool({
  //TODO: connection string
  user: "postgres",
  host: "db",
  password: "root"
});

const helpers = {
  landingBackendFn: async function (req, res) {
    try {
        await pool.query("CREATE TABLE ")
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error creating tables:", error);
      res.status(500);
    }
  }
};
module.exports = { helpers };
