export default class ContactDTO{
    constuctor(contact){
        this.name = contact.name + " " + contact.lastName ;
        this.phone = contact.phone ? contact.phone.split("-").join("") : "";
    }

}