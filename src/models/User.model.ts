import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcryptjs";

class User extends Model {
    public users_id!: number;
    public users_name!: string;
    public users_email!: string;
    public users_password!: string;
    public readonly users_createdAt!: Date;
    public readonly users_updatedAt!: Date;

    public async checkPassword(
        password: string,
        storedHash: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, storedHash);
    }
}

User.init(
    {
        users_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        users_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        users_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        users_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            set(value: string) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue("users_password", hash);
            },
        },
    },
    {
        sequelize,
        tableName: "users",
        modelName: "User",
    }
);

export default User;
