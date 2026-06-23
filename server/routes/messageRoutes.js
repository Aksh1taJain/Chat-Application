import express from 'express';
import { getMessages, markRead, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.use(protect);
router.get('/:chatId', getMessages);
router.post('/', sendMessage);
router.patch('/:chatId/read', markRead);
export default router;
