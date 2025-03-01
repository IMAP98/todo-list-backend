import type { Request, Response } from 'express';
import User from '../models/User.model';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateJWT } from '../utils/jwt';

export class AuthController {

    static register = async (req: Request, res: Response) => {

        try {
            const { name, email, password } = req.body;
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                const error = new Error('Este usuario ya existe');
                res.status(409).json({error: error.message});
                return;
            }

            const user = new User(req.body);

            user.password = await hashPassword(password);

            await User.create({ name, email, password: user.password });
            res.status(201).send('¡Cuenta creada exitosamente!');
        } catch (error) {
            res.status(500).send(`Error creando la tarea: ${error}`);
        }

    }

    static login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                const error = new Error('Usuario no encontrado');
                res.status(401).json({error: error.message});
                return;
            }
            
            const isPasswordCorrect = await checkPassword(password, user.password);

            if (!isPasswordCorrect) {
                const error = new Error('Contraseña incorrecta');
                res.status(401).json({error: error.message});
                return;
            }

            const token = generateJWT({id: user.id});
            res.status(200).send(token);

        } catch (error) {
            res.status(500).send(`Error creando la tarea: ${error}`);
        }
        
    }

    static getUser = async (req: Request, res: Response) => {
        res.status(200).json(req.user);
    }
    
}

