import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;
