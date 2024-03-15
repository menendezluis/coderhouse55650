import express from "express";

import { createMessage } from "../controller/chat.controller.js";



const ChatRouter = express.Router();


ChatRouter.post("/", createMessage);



export default ChatRouter;
