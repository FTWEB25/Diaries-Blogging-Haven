const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users",userRouter)
app.use("/blogs",blogRouter)
const PORT = process.env.PORT || 6000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
