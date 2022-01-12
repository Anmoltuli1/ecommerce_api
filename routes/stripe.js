const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
console.warn(KEY)
const stripe = require("stripe")('sk_test_51K9tanSGyKakAaVOpzYGSigaWB6ifuK9AHd5QTJM0X2uQK1WoYIrjAo9wH3ss7av3LZ8kUpISzmOMOJss388Zy7i00C4PRbELL');

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;