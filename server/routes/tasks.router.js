const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET      --gets tasks from DB. sortBy = SQL query string `ORDER BY [order]`
router.get("/:sortBy?", (req, res) => {
  const sortBy = req.params.sortBy;
  let queryText = "";

  if (!sortBy) {
    queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC;`;
  } else {
    queryText = `SELECT * FROM "tasks" ORDER BY ${sortBy};`;
  }
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
});

//  POST    --inserts new task to DB
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

//  PUT     --toggles task complete
router.put("/:id", (req, res) => {
  const taskID = req.params.id;
  const completed = req.body.completed; //boolean
  const queryText = `UPDATE "tasks"
    SET "completed" = $1
    WHERE "id" = $2;`;

  pool
    .query(queryText, [completed, taskID])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`PUT ERROR: ${err}`);
      res.sendStatus(500);
    });
});

//  DELETE  --deletes task
router.delete("/:id", (req, res) => {
  const taskID = req.params.id;
  const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

  pool
    .query(queryText, [taskID])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`DELETE ERROR: ${err}`);
      res.sendStatus(500);
    });
});

module.exports = router;
