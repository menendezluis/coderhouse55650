export default class Contacts {
  constructor() {
    this.data = [];
  }

  get = async () => {
    return this.data;
  };

  create = async (contact) => {
    contact.id = Math.random().toString(36).substr(2, 9);
    this.data.push(contact);
    return contact;
  };

  modify = async (id, contact) => {
    const index = this.data.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    this.data[index] = contact;
    //    this.data.splice(index, 1, contact);

    return contact;
  };
  delete = async (id) => {
    const index = this.data.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    const contact = this.data[index];
    this.data.splice(index, 1);
    return contact;
  };
}
