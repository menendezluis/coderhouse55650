import express from "express";
import ChatControllers from "../controllers/chat.controller.js";
import services from "../services/factory.js";

const ChatRouter = express.Router();
const chatController = new ChatControllers(services.chatService);

ChatRouter.post("/", chatController.createMessage);

export default ChatRouter;
