import type { Request, Response } from 'express';
import Tasks from '../models/Task.model';

export class TasksController {

    static createTask = async (req: Request, res: Response) => {
        
        try {
            const {name} = req.body;
            await Tasks.create({name});
            res.status(201).send('Task created successfully!');
        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }

    }

    static getAllTasks = async (req: Request, res: Response) => {
        
        try {
            const {name} = req.body;
            await Tasks.create({name});
            res.status(201).send('Task created successfully!');
        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }
        
    }

}   