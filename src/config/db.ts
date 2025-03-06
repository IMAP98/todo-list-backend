import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "todo_app_db",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "",
    {
        host: process.env.DB_HOST || "localhost",
        port: 3307,
        logging: false,
        dialect: "mysql",
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("DATABASE CONNECTED");
    })
    .catch((err) => {
        console.log(err);
    });

export default sequelize;
