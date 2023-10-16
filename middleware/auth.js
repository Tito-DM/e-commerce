const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //get token from header
  const authHeader = req.headers["authorization"];
  //check if is undefined
  if (!authHeader) return res.sendStatus(401);

  //verify token
  try {
    //split at space
    const bearerToken = authHeader.split(" ")[1];

    //check if not token
    if (!bearerToken) {
      return res.status(401).json({ msg: "not token, authorization denied" });
    }

    jwt.verify(bearerToken, process.env.JWTSECRETKEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user_id = decoded.id;
      next();
    });
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" ,err: error.message});
  }
};
