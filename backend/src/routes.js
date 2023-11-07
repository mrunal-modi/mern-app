const express = require("express");
const router = express.Router();
const controller = require("./controller");

// APIs > Controller
router.post("/v1/todos", controller.create);
router.get("/v1/todos/:email", controller.read); // Anything after colon is our variable that we use in the controller
router.get("/v1/todos", controller.readAll);
router.put("/v1/todos/:email", controller.update); // Anything after colon is our variable that we use in the controller
router.delete("/v1/todos/:email", controller._delete); // Anything after colon is our variable that we use in the controller

//Healthcheck
router.get("/healthcheck", (req, res) => {
  return res.status(200).send("Success");
});

router.use("*", (req, res) => {
  return res.status(404).send("Not Found");
});

module.exports = router;
