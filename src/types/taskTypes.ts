import { Optional } from "sequelize";

export interface TaskAttributes {
    tasks_id: number;
    tasks_name: string;
    tasks_completed?: boolean;
    tasks_users_id: number;
    tasks_createdAt?: Date;
    tasks_updatedAt?: Date;
}

export interface TaskCreationAttributes
    extends Optional<
        TaskAttributes,
        "tasks_id" | "tasks_createdAt" | "tasks_updatedAt"
    > {}
