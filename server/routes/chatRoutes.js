import express from 'express';
import { accessChat, createGroupChat, getChats } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.use(protect);
router.post('/', accessChat);
router.post('/group', createGroupChat);
router.get('/', getChats);
export default router;
