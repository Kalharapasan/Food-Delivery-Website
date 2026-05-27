import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;

}

export default authMiddleware;