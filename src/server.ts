import app from "./app";
import sequelize from "./config/db";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log("Database connection established successfully.");

        // Sync models
        await sequelize.sync();
        console.log("All models synchronized.");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start the server:", error);
        process.exit(1);
    }
};

startServer();
