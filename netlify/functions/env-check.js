exports.handler = async () => {
  const hasKey = Boolean(process.env.STRIPE_SECRET_KEY);
  const len = process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ hasStripeSecretKey: hasKey, keyLength: len }),
  };
};