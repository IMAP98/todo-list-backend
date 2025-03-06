import { Request, Response } from "express";
import taskService from "../services/taskService";
import { validationResult } from "express-validator";

export class TaskController {
    async createTask(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const tasks_users_id = req.user?.users_id;
            const task = await taskService.createTask({
                ...req.body,
                tasks_users_id,
            });

            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: "Error creating task", error });
        }
    }

    async getTasks(req: Request, res: Response) {
        try {
            const tasks_users_id = req.user?.users_id;
            const tasks = await taskService.getTasks(tasks_users_id!);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Error fetching tasks", error });
        }
    }

    async getTaskById(req: Request, res: Response) {
        try {
            const { tasks_id } = req.params;
            const tasks_users_id = req.user?.users_id;
            const task = await taskService.getTaskById(
                Number(tasks_id),
                tasks_users_id!
            );

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ message: "Error fetching task", error });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { tasks_id } = req.params;
            const { tasks_name, tasks_completed } = req.body;

            const updated = await taskService.updateTask(
                parseInt(tasks_id),
                tasks_name,
                tasks_completed
            );

            if (!updated) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ message: "Task updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error updating task", error });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const { tasks_id } = req.params;
            const tasks_users_id = req.user?.users_id;
            const deleted = await taskService.deleteTask(
                Number(tasks_id),
                tasks_users_id!
            );

            if (!deleted) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting task", error });
        }
    }
}

export default new TaskController();
