import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import jwt, { SignOptions } from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/User.model";
import { authMiddleware } from "../middleware/auth";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

// Middleware wrapper para manejar promesas
const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

router.post(
    "/register",
    [
        body("users_name").notEmpty().withMessage("Username is required"),
        body("users_email").isEmail().withMessage("Invalid email address"),
        body("users_password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    asyncHandler(async (req: Request, res: Response) => {
        // Validar errores de express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { users_name, users_email, users_password } = req.body;

            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ users_email }],
                },
            });

            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            console.log(users_name, users_email, users_password);
            // Crear nuevo usuario
            const user = await User.create({
                users_name,
                users_email,
                users_password,
            });
            console.log(user);

            // Generar token JWT con tipos correctos
            const jwtSecret = process.env.JWT_SECRET || "terminallogistics";
            const jwtOptions: SignOptions = {
                expiresIn: "30d",
            };

            const token = jwt.sign(
                { users_id: user.users_id },
                jwtSecret,
                jwtOptions
            );

            res.status(201).send({
                message: "User registered successfully",
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error registering user",
                error: error instanceof Error ? error.message : error,
            });
        }
    })
);

router.post(
    "/login",
    [
        body("users_email").isEmail().withMessage("Invalid email address"),
        body("users_password").notEmpty().withMessage("Password is required"),
    ],
    asyncHandler(async (req: Request, res: Response) => {
        // Validar errores de express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors });
        }

        try {
            const { users_email, users_password } = req.body;

            // Buscar usuario por email
            const user = await User.findOne({ where: { users_email } });
            // console.log(users_email, users_password);
            // console.log(user + "fasdsa");

            if (!user) {
                const error = new Error("Usuario no encontrado");
                res.status(401).json({ error: error.message });
                return;
            }

            // Verificar contraseña
            const isMatch = await user.checkPassword(
                users_password,
                user.users_password
            );

            if (!isMatch) {
                const error = new Error("Contraseña incorrecta");
                res.status(401).json({ error: error.message });
                return;
            }

            const token = jwt.sign(
                { users_id: user.users_id },
                process.env.JWT_SECRET || "terminallogistics",
                {
                    expiresIn: "30d",
                }
            );

            return res.status(200).send(token);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error logging in",
                error: error instanceof Error ? error.message : error,
            });
        }
    })
);

router.get(
    "/login",
    authMiddleware,
    // AuthController.getUser
    asyncHandler(async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                return res
                    .status(401)
                    .json({ message: "User not authenticated" });
            }

            // console.log(req.user.users_id);

            const user = await User.findByPk(req.user.users_id, {
                attributes: { exclude: ["users_password"] },
            });

            // console.log(user?.dataValues.users_id);

            if (!user?.dataValues) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).send({
                users_id: user.dataValues.users_id,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving user information",
                error: error instanceof Error ? error.message : error,
            });
        }
    })
);

export default router;
