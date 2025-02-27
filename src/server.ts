import express from 'express';
import tasksRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import db from './config/db';
import colors from 'colors';
import cors from 'cors';
import { corsConfig } from './config/cors';

const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.magenta.bold("Database connected successfully!"));
    } catch (error) {
        console.log("Oh no!There was an error connecting to the database:", error);
        
    }
}

connectDB();

const server = express();

server.use(cors(corsConfig));
server.use(express.json());
server.use('/tasks', tasksRoutes);
server.use('/auth', authRoutes);

export default server;