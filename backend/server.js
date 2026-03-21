const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");
require("dotenv").config();
const routes = require("./src/routes/auth.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
connectDB();
app.use("/api", routes);
app.listen(3000, (req, res) => {
  console.log("Server is running on 3000");
});
