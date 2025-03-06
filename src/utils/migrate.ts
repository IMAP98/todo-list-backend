import sequelize from '../config/db';
import User from '../models/User.model';
import Task from '../models/Task.model';

const migrate = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models (creates tables if they don't exist)
    await User.sync({ alter: true });
    await Task.sync({ alter: true });

    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

migrate();