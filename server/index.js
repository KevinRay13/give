require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const massive = require("massive");
const authCtrl = require("./controllers/auth_controller");
const prodCtrl = require("./controllers/product_controller");
const cors = require("cors");
//const auth = require("./controllers/adminAuth");

const app = express();

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    console.log("DB connected");
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  })
);
//user authentication
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);

//admin//
app.delete("/admin/inventory/:id", prodCtrl.deleteProduct);
app.post("/admin/inventory", prodCtrl.createProduct);
app.put("/admin/inventory/:id", prodCtrl.update);

//inventory
app.get("/inventory/products", prodCtrl.getAllProducts);

app.listen(5050, () => console.log(`listening on port ${5050}`));
