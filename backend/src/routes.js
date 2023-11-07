const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Contact APIs > contactController
router.post("/user", controller.create);
router.get("/user/:email", controller.read); // Anything after colon is our variable that we use in the controller
router.get("/user", controller.readAll);
router.put("/user/:email", controller.update); // Anything after colon is our variable that we use in the controller
router.delete("/user/:email", controller._delete); // Anything after colon is our variable that we use in the controller

//Healthcheck
router.get("/healthcheck", (req, res) => {
  return res.status(200).send("Success");
});

router.use("*", (req, res) => {
  return res.status(404).send("Not Found");
});

module.exports = router;
