import express from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post(
    "/register",
    body("users_name")
        .notEmpty()
        .withMessage("El nombre es un campo obligatorio")
        .isString()
        .withMessage("El nombre debe ser de tipo texto")
        .isLength({ min: 2 })
        .withMessage("El nombre debe tener al menos 2 caracteres"),
    body("users_email")
        .notEmpty()
        .withMessage("El email es un campo obligatorio")
        .isEmail()
        .withMessage("El email debe ser un correo electrónico válido"),
    body("users_password")
        .notEmpty()
        .withMessage("La contraseña es un campo obligatorio")
        .isString()
        .withMessage("La contraseña debe ser de tipo texto")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("users_password_confirmation").custom((value, { req }) => {
        if (value !== req.body.users_password) {
            throw new Error("Las contraseñas deben ser iguales");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.register
);

router.post(
    "/login",
    body("users_email").isEmail().withMessage("El email no es válido"),
    body("users_password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    AuthController.login
);

router.get("/login", authMiddleware, AuthController.getUser);

export default router;
