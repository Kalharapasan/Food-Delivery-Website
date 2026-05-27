import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please log in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        res.json({ success: false, message: "Invalid or expired token. Please log in again." });
    }

};

export default authMiddleware;