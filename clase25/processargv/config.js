import dotenv from "dotenv";

//const environment = "DEVELOPMENT";

const getEnvironment = (environment) => {
  dotenv.config({
    path:
      environment === "DEVELOPMENT" ? ".env.development" : ".env.production",
  });

  return {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  };
};

export default getEnvironment;
