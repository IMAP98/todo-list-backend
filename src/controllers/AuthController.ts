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
                const error = new Error('User already exists');
                res.status(409).json({error: error.message});
                return;
            }

            const user = new User(req.body);

            user.password = await hashPassword(password);

            await User.create({ name, email, password: user.password });
            res.status(201).send('Task created successfully!');
        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }

    }

    static login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                const error = new Error('User not found');
                res.status(401).json({error: error.message});
                return;
            }
            
            const isPasswordCorrect = await checkPassword(password, user.password);

            if (!isPasswordCorrect) {
                const error = new Error('Incorrect password');
                res.status(401).json({error: error.message});
                return;
            }

            const token = generateJWT({id: user.id});
            res.status(200).send(token);

        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }
        
    }
    
}

