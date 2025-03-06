import jwt from "jsonwebtoken";

type UserPayload = {
    id: number;
};

export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "terminallogistics",
        {
            expiresIn: "30d",
        }
    );
    return token;
};
