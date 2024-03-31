import dotenv from "dotenv";
dotenv.config();

export default {
  mongo: {
    URL: process.env.MONGO_URL || "mongodb://localhost:27017/usersCreator",
  },
};
