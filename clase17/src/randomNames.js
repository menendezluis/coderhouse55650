const generateRandomName = () => {
  let names = [
    "Juan",
    "Maria",
    "Carlos",
    "Pedro",
    "Marta",
    "Julio",
    "Jose",
    "Luis",
    "Patricia",
  ];

  let lastNames = [
    "Jimenez",
    "Gutierrez",
    "Lopez",
    "Ruiz",
    "Perez",
    "Juarez",
    "Rios",
    "Caceres",
    "Castro",
  ];
  let GROUP = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  let randomName = Math.floor(Math.random() * 10);
  let randomLastname = Math.floor(Math.random() * 10);

  let randomNumberTwo = Math.floor(Math.random() * 2);
  return {
    first_name: names[randomName],
    last_name: lastNames[randomLastname],
    group: randomNumberTwo + GROUP[randomName],
    grade: Math.floor(Math.random() * 11),
    email: names[randomName] + "." + lastNames[randomLastname] + "@gmail.com",
    gender: randomName % 2 === 0 ? "M" : "F",
  };
};

export { generateRandomName };
