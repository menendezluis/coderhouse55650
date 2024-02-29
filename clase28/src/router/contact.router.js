import { Router } from "express";
import { contactService } from "../repository/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const data = await contactService.getContacts();
  res.json(data);
});

router.post("/", async (req, res) => {
  const contact = req.body;
  const data = await contactService.createContact(contact);
  res.json(data);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const contact = req.body;
  const data = await contactService.modifyContact(id, contact);
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await contactService.deleteContact(id);
  res.json(data);
});

//import ContactDTO from "../dao/DTO/contact.js";

//import Contacts from "../dao/mongo/contact.mongo.js";
//import Contacts from "../dao/memory/contact.memory.js";
//import Contacts from "../dao/factory.js";
//import ContactRepository from "../repository/Contacts.repository.js";

//const contacts = new Contacts();
//const contactRepository = new ContactRepository(contacts);

/*router.get("/", async (req, res) => {
  try {
    const data = await contacts.get();
    res.json(data);
  } catch (error) {
    console.error("Error getting contacts", error);
    res.status(500).send("Error getting contacts");
  }
});

router.post("/", async (req, res) => {
  try {
    const contact = req.body;
    const newContact = new ContactDTO(contact);
    const data = await contacts.create(newContact);
    res.json(data);
  } catch (error) {
    console.error("Error creating contact", error);
    res.status(500).send("Error creating contact");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = req.body;
    const data = await contacts.modify(id, contact);
    res.json(data);
  } catch (error) {
    console.error("Error modifying contact", error);
    res.status(500).send("Error modifying contact");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await contacts.delete(id);
    res.json(data);
  } catch (error) {
    console.error("Error deleting contact", error);
    res.status(500).send("Error deleting contact");
  }
});
*/

export default router;
