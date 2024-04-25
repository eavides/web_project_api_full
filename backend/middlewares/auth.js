const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const handleAuthError = (status) => {
    //res.status(401).send({ message: "Error de autorización" });
    const err = new Error("Se requiere autorización");
    err.statusCode = status;
    return next(err);
  };

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(401);
  }

  const token = authorization.replace("Bearer ", "");
  console.log(NODE_ENV);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (e) {
    console.log(e);
    return handleAuthError(500);
  }
  console.log(payload, " paylooooad");
  req.user = payload;

  next();
  return req.user;
};
