import { Router } from 'express';
import { body,param } from 'express-validator';
import { TasksController } from '../controllers/TasksController';
import { handleInputErrors } from '../middleware/validation';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth);

router.post('/', 
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('completed')
        .notEmpty().withMessage('You must specify if the task is completed')
        .isBoolean().withMessage('Completed must be a boolean'),
    handleInputErrors,
    TasksController.createTask
);

router.get('/', 
    TasksController.getAllTasks
);

router.get('/:id', 
    param('id')
        .notEmpty().withMessage('Id is required')
        .isNumeric().withMessage('Id must be a number'),
        handleInputErrors,
    TasksController.getTaskById
);

router.put('/:id', 
    param('id')
        .notEmpty().withMessage('Id is required')
        .isNumeric().withMessage('Id must be a number'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('completed')
        .notEmpty().withMessage('You must specify if the task is completed'),
        handleInputErrors,
    TasksController.updateTask
);

router.delete('/:id', 
    param('id')
        .notEmpty().withMessage('Id is required')
        .isNumeric().withMessage('Id must be a number'),
    TasksController.deleteTask
);

export default router;
