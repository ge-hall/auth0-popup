// server/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../api/routes");

const PORT = 3005;

// server/server.js

// Other imports

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use("/", routes);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
