import { Router } from "express";
import { addTask, getAllTasks, deleteTask, getTaskById, updateTask, taskDone } from '../controllers/taskController.js';
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get('/allTasks',authenticateToken, getAllTasks);
router.post('/addTask',authenticateToken, addTask);
router.delete('/deleteTask/:id', deleteTask);
router.get('/getTaskById/:id',authenticateToken, getTaskById);
router.put('/updateTask/:id', updateTask);
router.put('/done/:id',authenticateToken,taskDone);

export default router;