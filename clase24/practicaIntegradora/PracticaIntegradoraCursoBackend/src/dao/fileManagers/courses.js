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
const path = __dirname+'/files/courses.json'
export default class Courses{
    constructor(){
        console.log(`Working with courses on path: ${path}`)
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
    saveCourse = async(course) =>{
        try{
            course.students = [];
            let courses = await this.getAll();
            if(courses.length===0){//First course
                course.id=1;
                courses.push(course)
                await fs.promises.writeFile(path,JSON.stringify(courses,null,'\t'))
            }
            else{
                course.id = courses[courses.length-1].id+1;
                courses.push(course);
                await fs.promises.writeFile(path,JSON.stringify(courses,null,'\t'));
                return course;
            }
        }
        catch(error){
            console.log("Couldn't write file: "+error)
            return null;
        }
    }
}