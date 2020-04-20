module.exports = {
  ...module.exports,
  ...require("../util.js")
};

module.exports.withRandomMinusOffset = (n, offsetPercentage = 0.25) => {
  const offset = offsetPercentage * Math.random() * n;
  return n - offset;
};

module.exports.withRandomOffset = (n, offsetPercentage = 0.1) => {
  const r = 2 * (Math.random() - 1 / 2); // [-1, 1)
  return n * (1 + offsetPercentage * r);
};

module.exports.range = n =>
  Array(n)
    .fill()
    .map((_, i) => i);

module.exports.authenticationMiddleware = (req, res, next) => {
  if (!req.session.authenticated) {
    return res.status(403).send();
  }
  next();
};
