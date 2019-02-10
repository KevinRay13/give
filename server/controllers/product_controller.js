module.exports = {
  getAllProducts: (req, res) => {
    // const allProds = await req.app.get("db").get_products();
    // return res.status(200).send(allProds);
    const dbInstance = req.app.get("db");

    dbInstance
      .get_products()
      .then(products => res.status(200).send(products))
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
      .then(() => res.sendStatus(200))
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
      .then(() => res.sendStatus(200))
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
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "re ruh roh" });
        console.log(err);
      });
  }
};
