import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    ENV: process.env.NODE_ENV || "production",
    PORT: process.env.PORT || 8080,
  },
  admin: {
    EMAIL: process.env.ADMIN_ID,
    PASSWORD: process.env.ADMIN_PASSWORD,
  },
  mailing: {
    SERVICE: process.env.MAILING_SERVICE,
    USER: process.env.MAILING_USER,
    PASSWORD: process.env.MAILING_PASSWORD,
  },
  mongo: {
    URL: process.env.MONGO_URL,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
};
