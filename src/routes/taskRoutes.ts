import express, { Request, Response } from 'express';
const router = express.Router();
import taskController from '../controllers/taskController';

router.post('/task', taskController.createTask);

router.get('/task/:id', taskController.getTask);

router.put('/task/:id', taskController.updateTask);

router.delete('/task/:id', taskController.deleteTask);

router.get('/tasks', taskController.getAllTasks);

export default router;
