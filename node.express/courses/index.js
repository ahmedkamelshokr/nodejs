const express = require("express");

const app = express();
app.use(express.json());

require("./startup/route")(app);
require("./startup/db")();
require("./startup/config");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
