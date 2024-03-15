import dotenv from 'dotenv';

dotenv.config();

export default{
    persistence: process.env.PERSISTENCE ,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/",

}