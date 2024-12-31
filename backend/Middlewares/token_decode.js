const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

app.use(authenticateJWT); // Apply to routes that require authentication

app.get("/secure-endpoint", (req, res) => {
  res.send("This is a secured endpoint. You are authenticated!");
});
