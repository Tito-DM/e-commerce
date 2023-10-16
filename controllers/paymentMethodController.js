const stripe = require("stripe")(process.env.STRIPE_APIKEY);

exports.paymentMethod = async (req, res) => {
  try {
    const payment_method = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 2,
        exp_year: 2024,
        cvc: "314",
      },
    });
    logger.info(
      `msg: Payment successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );
    res.status(200).json({
      msg: "Payment successfull",
      payment_method,
    });
  } catch (error) {
    logger.error(
      `msg: Issue making payment\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({ msg: error.message });
  }
};
