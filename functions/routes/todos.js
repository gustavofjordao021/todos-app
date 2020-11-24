const express = require("express");

const router = express.Router();

router.get("/todos", (req, res) => {
  return res.json(
    (todos = [
      {
        id: "1",
        title: "greeting",
        body: "Hello world from sharvin shah",
      },
      {
        id: "2",
        title: "greeting2",
        body: "Hello2 world2 from sharvin shah",
      },
    ])
  );
});

module.exports = router;
