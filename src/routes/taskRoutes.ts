import { Router } from 'express';
import { TaskApi } from '../api/tasks';

const router = Router();

router.post('/tasks', TaskApi.createTask);
router.get('/tasks', TaskApi.getTasks);
router.get('/tasks/:taskId', TaskApi.getTaskById);
router.put('/tasks/:taskId', TaskApi.updateTask);
router.delete('/tasks/:taskId', TaskApi.deleteTask);

export default router;
