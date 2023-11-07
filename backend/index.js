const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var cors = require("cors");
const routes = require("./src/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// DB
require("./src/db");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// Data parser - used to parse post data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/", routes);

// Swagger URL /
var options = {
  explorer: true,
  swaggerOptions: {
    url: "/api/api-docs/swagger.json",
  },
};
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Running on port: " + port);
