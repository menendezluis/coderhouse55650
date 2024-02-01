import jwt from "jsonwebtoken";

const PRIVATEKEY = "CoderKeySuperSecreatNadieDebeSaberlo";

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATEKEY, { expiresIn: "1h" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json("No token provided");
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, PRIVATEKEY, (err, user) => {
    if (err) {
      return res.status(403).json("Token no valido");
    }
    req.user = user;
    next();
  });
};

export { generateToken, authToken };
