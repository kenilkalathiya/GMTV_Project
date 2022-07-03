require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./mongo");

// routes
const loginSignupRouter = require("./routes/loginSignup");

app.use(cors());
app.use(express.json());

// setting up routes
app.use("/loginSignup", loginSignupRouter);

// connecting to mongodb database: moviesProject
connectToMongo();

// listening to port
app.listen(process.env.PORT, () => {
    console.log("Server is started on port 8000");
})
