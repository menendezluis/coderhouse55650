import { Router } from "express";
import {contactService} from "../repository/index.js";
// import ContactDTO from "../dao/DTO/contact.js";
// import Contacts from "../dao/mongo/contact.mongo.js";
// import Contacts from "../dao/memory/contact.memory.js";
// import Contacts from "../dao/factory.js";



const router = Router();
// const contacts = new Contacts();
// const contactRepository = new ContactRepository(contacts);


router.get("/", async (req, res) => {
  try{
    const data = await contactService.getContacts();
    res.json(data); 
  }
  catch (err) {
    console.error("Error getting contacts", err);
    res.status(500).json({ message: "Error getting contacts" });
  }
});

  router.post("/", async (req, res) => {
    try{
    const contact = req.body;
    const data = await contactService.createContact(contact);
    res.json(data);
    }
    catch (err) {
      console.error("Error creating contact", err);
      res.status(500).json({ message: "Error creating contact" });
    }
  });
 
  router.put("/:id", async (req, res) => {
    try{
      const id = req.params.id;
      const contact = req.body
      const data = await contactService.modifyContact(id, contact);
      res.json(data);
    }
    catch (err) {
      console.error("Error updating contact", err);
      res.status(500).json({ message: "Error updating contact" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try{
      const id = req.params.id;
      const data = await contactService.deleteContact(id);
      res.json(data);

    }
    catch (err) {
      console.error("Error deleting contact", err);
      res.status(500).json({ message: "Error deleting contact" });
    }
  });

    
export default router;







// router.get("/", async (req, res) => {
//   try {
//     const data = await contacts.get();
//     res.json(data);
//   } catch (err) {
//    console.log("Error getting contacts", err);
//     res.status(500).json({ message: "Error getting contacts" });

//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const contact = req.body;
    
//     const newContact = new ContactDTO(contact);
//     const data = await contacts.create(newContact);
//     res.json(data);
//   } catch (err) {
//     console.error("Error creating contact", err);
//     res.status(500).json({ message: "Error creating contact" });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const contact = req.body;
//     const data = await contacts.modify(id, contact);
//     res.json(data);
//   } catch (err) {
//     console.error("Error updating contact", err);
//     res.status(500).json({ message: "Error updating contact" });
//   }
// });

// router.delete("/:id", async (req, res) => {
//     try {
//     const id = req.params.id;
//     const data = await contacts.delete(id);
//     res.json(data);
//   } catch (err) {
//     console.error("Error deleting contact", err);
//     res.status(500).json({ message: "Error deleting contact" });
//   }
// });

// export default router;