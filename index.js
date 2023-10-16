const express = require("express");
const dbConnection = require("./config/dbConnection");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const paymentMethodRouter = require("./routers/paymentMethod");
const productRouter = require("./routers/product");
const oderRouter = require("./routers/order");
const bodyParser = require("body-parser");
const searchRouter = require("./routers/search");
const authMiddleware = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const refreshTokkenRouter = require("./routers/refreshToken");
const logger = require("./helpers/logger");
const app = express();

require("dotenv").config();

//parser for POST JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//parser for cookie
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//db connection
dbConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/refrestoken", refreshTokkenRouter);

//middleware verification
app.use(authMiddleware);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", oderRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment-method", paymentMethodRouter);
app.use("/api/v1/seach", searchRouter);

app.listen(PORT, () => {
  logger.info(`Server up and running on port ${PORT}`)
});
