import type { Request, Response } from "express";
// import User from "../models/User.model";
// import { checkPassword, hashPassword } from "../utils/auth";
// import { generateJWT } from "../utils/jwt";

export class AuthController {
    // static register = async (req: Request, res: Response) => {
    //     try {
    //         const { users_name, users_email, users_password } = req.body;
    //         const userExists = await User.findOne({ where: { users_email } });
    //         if (userExists) {
    //             const error = new Error("Este usuario ya existe");
    //             res.status(409).json({ error: error.message });
    //             return;
    //         }
    //         const user = new User(req.body);
    //         user.users_password = await hashPassword(users_password);
    //         await User.create({
    //             users_name,
    //             users_email,
    //             users_password: user.users_password,
    //         });
    //         res.status(201).send("¡Cuenta creada exitosamente!");
    //     } catch (error) {
    //         res.status(500).send(`Error creando la tarea: ${error}`);
    //     }
    // };
    // static login = async (req: Request, res: Response) => {
    //     try {
    //         const { users_email, users_password } = req.body;
    //         const user = await User.findOne({ where: { users_email } });
    //         console.log(user);
    //         console.log(users_email);
    //         if (!user) {
    //             const error = new Error("Usuario no encontrado");
    //             res.status(401).json({ error: error.message });
    //             return;
    //         }
    //         const isPasswordCorrect = await checkPassword(
    //             users_password,
    //             user.users_password
    //         );
    //         if (!isPasswordCorrect) {
    //             const error = new Error("Contraseña incorrecta");
    //             res.status(401).json({ error: error.message });
    //             return;
    //         }
    //         const token = generateJWT({ id: user.users_id });
    //         res.status(200).send(token);
    //     } catch (error) {
    //         res.status(500).send(`Error creando la tarea: ${error}`);
    //     }
    // };
    // static getUser = async (req: Request, res: Response) => {
    //     // console.log(req.user);
    //     res.status(200).send(req.user);
    // };
}
