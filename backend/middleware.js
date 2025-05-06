// middleware/authenticateUser.js
import admin from "./lib/firebaseAdmin.js";

async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    // Attach user info to request
    req.user = {
      firebaseUid: decoded.uid,
      email: decoded.email,
    };

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
}

export default authenticateUser;
