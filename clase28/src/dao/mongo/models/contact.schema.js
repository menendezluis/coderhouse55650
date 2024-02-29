import mongoose from "mongoose";

const contactCollection = "contacts";

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Contact = mongoose.model(contactCollection, contactSchema);

export default Contact;
