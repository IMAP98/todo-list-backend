import Task from "../models/Task.model";
import { TaskCreationAttributes } from "../types/taskTypes";

export class TaskService {
    async createTask(taskData: TaskCreationAttributes) {
        return await Task.create(taskData);
    }

    async getTasks(tasks_users_id: number) {
        return await Task.findAll({
            where: { tasks_users_id },
            order: [["tasks_createdAt", "DESC"]],
        });
    }

    async getTaskById(tasks_id: number, tasks_users_id: number) {
        return await Task.findOne({
            where: { tasks_id, tasks_users_id },
        });
    }

    async updateTask(
        tasks_id: number,
        tasks_name: string,
        tasks_completed: boolean
    ) {
        const updatedRows = await Task.update(
            { tasks_name, tasks_completed },
            { where: { tasks_id } }
        );
        return updatedRows;
    }

    async deleteTask(tasks_id: number) {
        const deletedRows = await Task.destroy({
            where: { tasks_id },
        });
        return deletedRows;
    }
}

export default new TaskService();
