require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const massive = require("massive");
const authCtrl = require("./controllers/auth_controller");
const prodCtrl = require("./controllers/product_controller");
const cors = require("cors");
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//const checkForSession = require("./middleware/checkForSession");
//const auth = require("./controllers/adminAuth");
const pay_controller = require("./controllers/payment_controller");
const path = require("path");

const app = express();
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(json());
app.use(cors());
// app.use(express.static(`${__dirname}/../build`));
app.use(
  session({
    resave: true,

    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    //cart: [{}],
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    console.log("DB connected");
    app.set("db", db);
  })
  .catch(err => console.log(err));

// const configureRoutes = require("./routes");
// configureRoutes(app);
// const paymentApi = require("./payment");
// const configureRoutes = app => {
//paymentApi(app);
// };
// module.exports = configureRoutes;

//app.use(checkForSession);

//user authentication
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.post("/auth/logout", authCtrl.logout);
app.get("/auth/user", authCtrl.getUser);

//admin//
app.delete("/admin/inventory/:id", prodCtrl.deleteProduct);
app.post("/admin/inventory", prodCtrl.createProduct);
app.put("/admin/inventory/:id", prodCtrl.update);
app.get("/admin/orders", prodCtrl.getOrders);

//inventory
app.get("/inventory/products", prodCtrl.getAllProducts);
app.post("/inventory/addToCart", prodCtrl.addToCart); //add to cart
app.get("/inventory/cart", prodCtrl.getCart); //get current cart
//app.post("/charge", prodCtrl.charge);

//payment
app.post("/payment", pay_controller.takePayment);

// const stripeChargeCallback = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({ error: stripeErr });
//   } else {
//     res.status(200).send({ success: stripeRes });
//   }
// };
// const paymentApi = app => {
//   app.get("/", (req, res) => {
//     res.send({
//       message: "Hello Stripe checkout server!",
//       timestamp: new Date().toISOString()
//     });
//   });
//   app.post("/payment", (req, res) => {
//     const body = {
//       source: req.body.token.id,
//       amount: req.body.amount,
//       currency: "usd"
//     };
//     stripe.charges.create(body, stripeChargeCallback(res));
//   });
//   return app;
// };

app.listen(5050, () => console.log(`listening on port ${5050}`));
