import type { Request, Response } from 'express';
import Tasks from '../models/Task.model';

export class TasksController {

    static createTask = async (req: Request, res: Response) => {
        
        let {name, completed, idUser} = req.body
        idUser = req.user;
        
        try {
            await Tasks.create({name, completed, idUser});
            res.status(201).send('Task created successfully!');
        } catch (error) {
            res.status(500).send(`Error creating task: ${error}`);
        }

    }

    static getAllTasks = async (req: Request, res: Response) =>{
        
        let {idUser} = req.body;
        idUser = req.user;

        try {
            const tasks = await Tasks.findAll({
                where: {idUser}
            });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).send(`Error trying to get all tasks: ${error}`);
        }
        
    }

    static getTaskById = async (req: Request, res: Response) =>{
        
        let {id} = req.body;
        id = req.params.id;

        try {
            const tasks = await Tasks.findByPk(id);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).send(`Error trying to get all tasks: ${error}`);
        }
        
    }

    static updateTask = async (req: Request, res: Response) => {

        const { id } = req.params;
        const { name, completed } = req.body;
        let { idUser } = req.body;
        idUser = req.user;

        try {

            const tasks = await Tasks.findByPk(id);

            if (tasks) {

                if(idUser !== tasks.idUser) {
                    const error = new Error('You are not authorized to update this task');
                    res.status(401).json({error: error.message});
                    return;
                }

                await Tasks.update({name, completed}, { where: { id } });
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
        let { idUser } = req.body;
        idUser = req.user;

        try {
            const tasks = await Tasks.findByPk(id);

            if (tasks) {
                                
                if(idUser !== tasks.idUser) {
                    const error = new Error('You are not authorized to update this task');
                    res.status(401).json({error: error.message});
                    return;
                }

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