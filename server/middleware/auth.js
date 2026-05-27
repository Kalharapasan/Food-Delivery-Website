import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please log in." });
    }

}

export default authMiddleware;