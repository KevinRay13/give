const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
//   app.post("/", (req, res) => {
//     const body = {
//       source: req.body.token.id,
//       amount: req.body.amount,
//       currency: "usd"
//     };
//     stripe.charges.create(body, stripeChargeCallback(res));
//   });
//   return app;
// };
// module.exports = paymentApi;
//const total = 10.00
module.exports = {
  takePayment: (req, res) => {
    const token = req.body.token;
    console.log("The token on the back-end", token);

    const charge = stripe.charges
      .create({
        amount: req.body.amount,
        currency: "USD",

        source: token.id
      })
      .then(() => {
        res.status(200).json(charge);
      });
  }
};
