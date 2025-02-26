import express from 'express';
import tasksRoutes from './routes/taskRoutes';
import db from './config/db';
import colors from 'colors';


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

server.use(express.json());

server.use('/tasks', tasksRoutes);

export default server;