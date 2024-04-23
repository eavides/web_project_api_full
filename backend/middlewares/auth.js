const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const handleAuthError = (status) => {
    //res.status(401).send({ message: "Error de autorización" });
    const err = new Error("Se requiere autorización");
    err.statusCode = status;
    return next(err);
  };

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError(401);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (e) {
    handleAuthError(500);
  }
  console.log(payload, " paylooooad");
  req.user = payload;

  next();
  return req.user;
};
