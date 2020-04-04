const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/:sortBy?", (req, res) => {
  const sortBy = req.params.sortBy;
  let queryText = "";

  if (!sortBy) {
    queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC;`;
    pool
      .query(queryText)
      .then((dbRes) => {
        const dbRows = dbRes.rows;
        console.table(dbRows);
        res.send(dbRows);
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
