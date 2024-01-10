import fs from 'fs';
import __dirname from '../../utils.js';
/**
 * Recuerda que es una práctica integradora, no te esmeres demasiado en explicar a fondo un tema
 * Tu mayor fuerte en la práctica integradora será la transición de fileSystem a base de datos
 * De manera que si utilizas mucho tiempo en desarrollar estos módulos, puede que no te dé el 
 * tiempo suficiente para poder hacer las demás cosas. 
 * Por ello, en lugar de desarrollar todos los métodos, sólo se desarrollarán los primeros dos
 * y los más importantes (creación y lectura).
 */
const path = __dirname+'/files/users.json'
export default class Users{
    constructor(){
        console.log(`Working with users on path: ${path}`)
    }
    getAll = async() =>{
        if(fs.existsSync(path)){
            try{
                let data = await fs.promises.readFile(path,'utf8');
                return JSON.parse(data);
            }
            catch(error){
                console.log("Couldn't read file: "+error)
                return null;
            }
        }
        else{
            return [];
        }
    }
    saveUser = async(user) =>{
        try{
            user.courses = [];
            let users = await this.getAll();
            if(users.length===0){//First user
                user.id=1;
                users.push(user)
                await fs.promises.writeFile(path,JSON.stringify(users,null,'\t'))
            }
            else{
                user.id = users[users.length-1].id+1;
                users.push(user);
                await fs.promises.writeFile(path,JSON.stringify(users,null,'\t'));
                return user;
            }
        }
        catch(error){
            console.log("Couldn't write file: "+error)
            return null;
        }
    }
}