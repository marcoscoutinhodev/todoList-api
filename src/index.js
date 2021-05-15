const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

require("./router/Task")(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running...");
});