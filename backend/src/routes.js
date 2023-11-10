const express = require("express");
const router = express.Router();
const controller = require("./controller");

// APIs > Controller
router.post("/todos", controller.create);
router.get("/todos/:task", controller.read); // Anything after colon is our variable that we use in the controller
router.get("/todos", controller.readAll);
router.put("/todos/:task", controller.update); // Anything after colon is our variable that we use in the controller
router.delete("/todos/:task", controller._delete); // Anything after colon is our variable that we use in the controller

//Healthcheck
router.get("/healthcheck", (req, res) => {
  return res.status(200).send("Success");
});

router.use("*", (req, res) => {
  return res.status(404).send("Not Found");
});

module.exports = router;
