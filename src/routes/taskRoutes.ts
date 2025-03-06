import express, { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import taskController from "../controllers/TasksController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Middleware wrapper to handle async route handlers
const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post(
    "/",
    [
        body("tasks_name").notEmpty().withMessage("Title is required"),
        body("tasks_completed").optional(),
    ],
    asyncHandler(taskController.createTask)
);

router.get("/", asyncHandler(taskController.getTasks));

router.get(
    "/:tasks_id",
    [param("tasks_id").isInt().withMessage("Invalid task ID")],
    asyncHandler(taskController.getTaskById)
);

router.put(
    "/:tasks_id",
    [
        param("tasks_id").isInt().withMessage("Invalid task ID"),
        body("tasks_name")
            .optional()
            .notEmpty()
            .withMessage("Title cannot be empty"),
        body("tasks_name").optional(),
    ],
    asyncHandler(taskController.updateTask)
);

router.delete(
    "/:tasks_id",
    [param("tasks_id").isInt().withMessage("Invalid task ID")],
    asyncHandler(taskController.deleteTask)
);

export default router;
