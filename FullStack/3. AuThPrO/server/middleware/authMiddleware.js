// Checks that the request has the "email" cookie.
// If yes -> put the email on req.user and continue to the controller.
// If no  -> reject the request with 401.
const authMiddleware = (req, res, next) => {
  const email = req.cookies.email;

  if (!email) {
    return res.status(401).json({ message: "Not logged in. Cookie is missing." });
  }

  req.user = email;
  next();
};

module.exports = authMiddleware;
