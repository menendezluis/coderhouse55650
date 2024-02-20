import dotenv from "dotenv";

dotenv.config();

export default {
  DB_URL_QA: process.env.DB_URL_QA,
  DB_URL_PROD: process.env.DB_URL_PROD,
  DB_URK_DEV: process.env.DB_URK_DEV,
  PORT_DEV: process.env.PORT_DEV,
  PORT_QA: process.env.PORT_QA,
  PORT_PROD: process.env.PORT_PROD,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};
