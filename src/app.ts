// import express from "express";
// import dotenv from "dotenv";
// import taskRoutes from "./routes/taskRoutes";
// import authRoutes from "./routes/authRoutes";

// // Load environment variables
// dotenv.config();

// class App {
//     public express: express.Application;

//     constructor() {
//         this.express = express();
//         this.middlewares();
//         this.routes();
//     }

//     private middlewares(): void {
//         // Parse JSON bodies
//         this.express.use(express.json());

//         // CORS middleware
//         this.express.use((req, res, next) => {
//             res.header("Access-Control-Allow-Origin", "*");
//             res.header(
//                 "Access-Control-Allow-Methods",
//                 "GET, POST, PUT, DELETE"
//             );
//             res.header(
//                 "Access-Control-Allow-Headers",
//                 "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//             );
//             res.header("Access-Control-Allow-Credentials", "true");
//             res.header("Access-Control-Expose-Headers", "Authorization");
//             res.header("Access-Control-Allow-Headers", "Content-Type");

//             next();
//         });
//     }

//     private routes(): void {
//         // Health check route
//         this.express.get("/health", (req, res) => {
//             res.status(200).json({ message: "Server is running" });
//         });

//         // Auth routes
//         this.express.use("/tasks", taskRoutes);
//         this.express.use("/auth", authRoutes);
//     }
// }

// export default new App().express;
import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config();

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        // Parse JSON bodies
        this.express.use(express.json());

        // CORS middleware
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

            // Handle preflight OPTIONS requests
            if (req.method === "OPTIONS") {
                return res.status(200).end();
            }

            next();
        });
    }

    private routes(): void {
        // Health check route
        this.express.get("/health", (req, res) => {
            res.status(200).json({ message: "Server is running" });
        });

        // Auth routes
        this.express.use("/tasks", taskRoutes);
        this.express.use("/auth", authRoutes);
    }
}

export default new App().express;
