import jwt from "jsonwebtoken";

// Middleware for token verification
const authMiddleware = async (req, res, next) => {
  try {
    console.log("Auth Middleware Called".bgCyan);

    // Get the authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Extract token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing or malformed",
      });
    }

    console.log("Extracted Token: ", token.zebra);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        // Attach user ID to the request object
        req.body.id = decoded.id;
        next(); // Pass control to the next middleware or route handler
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
      error,
    });
  }
};

// Exporting the middleware
export { authMiddleware };
