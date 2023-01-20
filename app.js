const express = require("express");
const netflixRouter = require("./routers/netflixRouter");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const morgan = require("morgan");
const cors = require("cors");

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB).then((con) => {
  //console.log(con.connections);
  console.log("DB CONNECTION CREATED");
});

let app = express();

app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use(cors());
app.use("/netflix", netflixRouter);

app.listen(process.env.PORT, () => {
  console.log("SERVER LISTENING ON PORT:" + process.env.PORT);
});
