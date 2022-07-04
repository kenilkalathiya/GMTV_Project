require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./mongo");

// importing routes
const loginSignupRouter = require("./routes/loginSignup");
const moviesSeriesRouter = require("./routes/movieSeries");

app.use(cors());
app.use(express.json());

// setting up routes
app.use("/loginSignup", loginSignupRouter);
app.use("/moviesSeries", moviesSeriesRouter);

// connecting to mongodb database: moviesProject
connectToMongo();

// listening to port
app.listen(process.env.PORT, () => {
    console.log("Server is started on port 8000");
})
