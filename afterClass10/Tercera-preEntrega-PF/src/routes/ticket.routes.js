import express from "express";
import services from "../services/factory.js";
import TicketsController from "../controllers/tickets.controller.js";

const ticketRouter = express.Router();
const ticketsController = new TicketsController(services.ticketService);


ticketRouter.get("/", ticketsController.createTicket);
ticketRouter.get("/:cid", ticketsController.getTickets);
ticketRouter.put("/:cid", ticketsController.updateTicket);
ticketRouter.delete("/:cid", ticketsController.deleteTicket);

export default ticketRouter;
