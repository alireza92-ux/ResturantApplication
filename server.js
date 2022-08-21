const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");

const connectDB = require("./config/database");
const { errorHandler } = require("./middlewares/errors");
const { setHeaders } = require("./middlewares/headers");

dotEnv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(setHeaders);

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

app.use(errorHandler);

const port = process.env.PORT || 3500;

app.listen(port, () => console.log(`Server is running on port ${port}`))