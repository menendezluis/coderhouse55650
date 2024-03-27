export default class userDTO{
    constuctor(user){
        this.name = user.name + " " + user.lastName ;
        this.phone = user.phone ? user.phone.split("-").join("") : "";
    }

}