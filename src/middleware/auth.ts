import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401).json({
            message: "No token, authorization denied",
        });
        return;
    }

    const [, token] = bearer!.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "terminallogistics"
        );

        if (typeof decoded === "object" && decoded.id) {
            const user = await User.findByPk(decoded.id);

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ error: "Invalid token" });
            }
        }
    } catch (error) {
        res.status(401).json({ error: `Invalid token: ${error}` });
    }
};
