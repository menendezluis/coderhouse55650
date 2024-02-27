import MongoSingleton from "./MongoSingleton.js";

const firstInstance = MongoSingleton.getInstance();
const secondInstance = MongoSingleton.getInstance();
const thirdInstance = MongoSingleton.getInstance();
const fourthInstance = MongoSingleton.getInstance();
