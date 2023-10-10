import express from 'express';
const router = express.Router();
import taskController from '../controllers/taskController';

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);

export default router;
