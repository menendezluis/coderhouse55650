import { faker } from "@faker-js/faker";

//faker.locale = "es"

export const generateUser = () => {
  let listOfProducts = [];
  let numOfProducts = Math.floor(Math.random() * 10);
  let example = parseInt(
    faker.string.numeric({
      min: 1,
      max: 10,
    })
  );
  for (let i = 0; i < numOfProducts; i++) {
    listOfProducts.push(generateProducts());
  }
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    sex: faker.person.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    products: listOfProducts,
    image: faker.image.avatar(),
    id: faker.database.mongodbObjectId(),
    role: faker.datatype.boolean() ? "admin" : "user",
    isPremium: faker.datatype.boolean(),
    position: faker.person.jobTitle(),
  };
};

export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: Math.floor(Math.random() * 100),
    id: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    code: faker.commerce.isbn(),
    description: faker.commerce.productDescription(),
  };
};
