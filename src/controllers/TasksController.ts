import type { Request, Response } from 'express';
import Tasks from '../models/Task.model';

export class TasksController {

    static createTask = async (req: Request, res: Response) => {
        
        try {
            const {name, completed, idUser} = req.body;
            await Tasks.create({name, completed, idUser});
            res.status(201).send('Task created successfully!');
        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }

    }

    static getAllTasks = async (req: Request, res: Response) =>{
        
        try {
            const tasks = await Tasks.findAll({});
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).send(`Error trying to get all tasks: ${error}`);
        }
        
    }

    static updateTask = async (req: Request, res: Response) => {

        const { id } = req.params;
        const { name, completed } = req.body;

        try {

            const tasks = await Tasks.findByPk(id);

            if (tasks) {
                const tasks = await Tasks.update({name, completed}, { where: { id } });
                res.status(200).send('Task updated successfully!');
                return;
            } else {
                const error = new Error('Task not found');
                res.status(404).json({error: error.message});
                return;
            }


        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }
        
    }

    static deleteTask = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {
            const tasks = await Tasks.findByPk(id);

            if (tasks) {
                await tasks.destroy();
                res.status(200).send('Task deleted successfully!');
                return;
            } else {
                const error = new Error('Task not found');
                res.status(404).json({error: error.message});
                return;
            }


        } catch (error) {
            res.status(500).send(`Error deleting task: ${error}`);
        }
        
    }
    
}