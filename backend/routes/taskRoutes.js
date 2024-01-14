import express from 'express'
import { createNewTask, updateTask, deleteTask, getAllTask } from '../controller/task.js'
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.get('/getAllTask',isAuth, getAllTask);
router.post('/task/new', isAuth, createNewTask);
router.route('/task/update/:id').patch(isAuth, updateTask);
router.route('/task/delete/:id').delete(isAuth,deleteTask);

export default router;