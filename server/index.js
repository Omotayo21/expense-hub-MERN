const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv")
const mongoose = require("mongoose");
const AppError = require("./helpers/AppError");
const errorController = require("./controllers/errorController");
const expenseRoutes = require("./routes/expensesRoute"); // Import expense routes
const revenueRoutes = require("./routes/revenueRoute"); // Import revenue routes
const resetPasswordRoutes = require("./routes/resetpasswordRoute")
const forgotPasswordRoutes = require("./routes/forgotpasswordRoute")
const verifyMailRoutes = require("./routes/verifymailRoute")
const logoutRoutes = require("./routes/logoutRoute")
const loginRoutes = require("./routes/loginRoute")
const signupRoutes = require("./routes/signupRoute")
const meRoutes = require("./routes/meRoute")

const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
require("dotenv").config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

app.use("/api/expenses", expenseRoutes);
app.use("/api/revenues", revenueRoutes);
app.use("/api/login", loginRoutes) 
app.use("/api/signup", signupRoutes)
app.use("/api/me", meRoutes);
app.use("/api/resetpassword", resetPasswordRoutes);
app.use("/api/forgotpassword", forgotPasswordRoutes);
app.use("/api/verify", verifyMailRoutes);
app.use("/api/logout", logoutRoutes);
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

const uri = process.env.MONGODB_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorController);