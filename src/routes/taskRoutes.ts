import { Router } from 'express';
import { TasksController } from '../controllers/TasksController';

const router = Router();

router.post('/', TasksController.createTask);
router.get('/', TasksController.getAllTasks);

export default router;