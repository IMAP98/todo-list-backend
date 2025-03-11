import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());

        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
            );
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Expose-Headers", "Authorization");

            if (req.method === "OPTIONS") {
                return res.status(200).end();
            }

            next();
        });
    }

    private routes(): void {
        this.express.get("/health", (req, res) => {
            res.status(200).json({ message: "Server is running" });
        });

        this.express.use("/tasks", taskRoutes);
        this.express.use("/auth", authRoutes);
    }
}

export default new App().express;
