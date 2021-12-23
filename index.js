const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{console.log("db connected succesfully")})
    .catch((err)=>{console.log(err)});

app.use(express.json())
app.get("/api/test", ()=>{
    console.log("test is working")
})    


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("api/payments", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is running on port: 5000")
})