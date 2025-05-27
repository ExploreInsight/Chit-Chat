import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllMessages, getAllUsers , sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute,getAllUsers);
router.get('/:id', protectRoute, getAllMessages);

router.post("/send/:id",protectRoute, sendMessages);
export default router;