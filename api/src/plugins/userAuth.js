import jwt from "jsonwebtoken";

export function userAuth(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).json({ message: "Token não encontrado" });
  }
  const [, token] = authHeaders.split(" ");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const { sub } = jwt.decode(token);
    req.userId = sub.toString();
    return next();
  } catch (err) {
    console.log(err)
    return res.status(401).end();
  }
}
