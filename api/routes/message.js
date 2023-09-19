import express from 'express';
import { messageModel } from '../schema/message.js';
const messageRoutes = express.Router();
import { protect } from '../middlewares/authMiddleware.js';
import { handleGetMessages, handleMessageSend } from '../controllers/messageControllers.js';


messageRoutes.get("/:chatId", handleGetMessages)
messageRoutes.post("/:chatId", protect, handleMessageSend)

export default messageRoutes;