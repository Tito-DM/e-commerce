import logger from "../helpers/logger";

const stripe = require("stripe")(process.env.STRIPE_APIKEY);

export async function makePayment(req, res) {
  try {
    const payment_intend = await stripe.paymentIntents.create({
      payment_method: req.body.payment_method_id,
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
    });
  } catch (error) {
    logger.error(
      `msg: Issue making payment\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
}
