import ContactDTO from "../dao/DTO/contact.js";

export default class ContactRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getContacts = async () => {
        const result = await this.dao.get();
        return result;
    }

    createContact = async (contact) => {
        const newContact = new ContactDTO(contact);
        const result = await this.dao.create(newContact);
        return result;
    }

    modifyContact = async (id, contact) => {
        const result = await this.dao.modify(id, contact);
        return result;
    }

    deleteContact = async (id) => {
        const result = await this.dao.delete(id);
        return result;
    }
}


