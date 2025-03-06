import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User.model";
import { TaskAttributes, TaskCreationAttributes } from "../types/taskTypes";

class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    public tasks_id!: number;
    public tasks_name!: string;
    public tasks_completed!: boolean;
    public tasks_users_id!: number;
    public readonly tasks_createdAt!: Date;
    public readonly tasks_updatedAt!: Date;
}

Task.init(
    {
        tasks_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        tasks_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tasks_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        tasks_users_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "users_id",
            },
        },
        tasks_createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        tasks_updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "tasks",
        modelName: "Task",
    }
);

Task.belongsTo(User, { foreignKey: "tasks_users_id" });
User.hasMany(Task, { foreignKey: "tasks_users_id" });

export default Task;
