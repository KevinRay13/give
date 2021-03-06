let cart = [];

module.exports = {
  getAllProducts: (req, res, next) => {
    // const allProds = await req.app.get("db").get_products();
    // return res.status(200).send(allProds);
    const dbInstance = req.app.get("db");

    dbInstance
      .get_products()
      .then(products => res.status(200).send(products))
      //.then(products => console.log(products))
      .catch(err => {
        res.status(500).send({ errorMessage: "ruh roh" });
        console.log(err);
      });
  },
  update: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { price } = req.body;

    dbInstance

      .update_price([req.params.id, price])
      .then(data => res.json(data))
      .catch(err => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong." });
        console.log(err);
      });
  },
  deleteProduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_product([params.id])
      .then(data => res.json(data))

      .catch(err => {
        res.status(500).send({ errorMessage: "raggie" });
        console.log(err);
      });
  },
  createProduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { product_name, description, price, img_url } = req.body;

    dbInstance
      .create_product([product_name, description, price, img_url])
      .then(data => res.json(data))
      .catch(err => {
        res.status(500).send({ errorMessage: "re ruh roh" });
        console.log(err);
      });
  },
  getCart: (req, res) => {
    res.json(cart);
  },
  // addToCart: (req, res, next) => {
  //   const { id } = req.query;
  //   let { cart } = req.session.user;

  //   const index = cart.findIndex(product => product.id == id);

  //   if (index === -1) {
  //     const selectedSwag = swag.find(product => product.id == id);

  //     cart.push(selectedSwag);
  //     req.session.user.total += selectedSwag.price;
  //   }
  //   res.status(200).send(req.session.user);
  // },
  addToCart: (req, res) => {
    const dbInstance = req.app.get("db");
    //console.log("req.body.id: ", req.body.id);
    dbInstance
      .get_product(req.body.id)
      .then(data => {
        //console.log("data: ", data);
        cart.push(data);

        res.json(data);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "re ruh roh" });
        console.log(err);
      });
  },
  charge: async (req, res) => {
    try {
      let { status } = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });

      res.json({ status });
    } catch (err) {
      res.status(500).end();
    }
  },
  getOrders: (req, res, next) => {
    // const allProds = await req.app.get("db").get_products();
    // return res.status(200).send(allProds);
    const dbInstance = req.app.get("db");

    dbInstance
      .get_orders()
      .then(orders => res.json(orders))
      //.then(products => console.log(products))
      .catch(err => {
        res.status(500).send({ errorMessage: "ruh roh" });
        console.log(err);
      });
  }
};
