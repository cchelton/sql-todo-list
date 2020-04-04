const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET  --gets tasks from DB. Has url param to sort
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
        console.log(`GET ERROR: ${err}`);
        res.sendStatus(500);
      });
  }
});

//  POST  --inserts new task to DB
router.post("/", (req, res) => {
  const taskData = req.body;
  console.log(taskData);

  const queryText = `INSERT INTO "tasks" ("task", "completed")
    VALUES ($1, FALSE);`;

  pool
    .query(queryText, [taskData.task])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`POST ERROR: ${err}`);
      res.sendStatus(500);
    });
});

module.exports = router;
