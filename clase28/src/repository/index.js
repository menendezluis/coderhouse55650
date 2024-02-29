import Contacts from "../dao/factory.js";
import ContactRepository from "./Contacts.repository.js";

export const contactService = new ContactRepository(new Contacts());
