"use strict";
const character = "luis";
const person = {
  name: "Luis",
  age: 34,
  gender: "male",
  languages: [
    {
      language: "es",
      level: 10,
    },
    {
      language: "en",
      level: 8,
    },
  ],
};
//console.log(person);
const inputs = document.querySelectorAll("input");
const clickAdd = document.getElementById("add");
clickAdd === null || clickAdd === void 0
  ? void 0
  : clickAdd.addEventListener("click", () => {
      inputs.forEach((input) => {
        console.log(input.value);
      });
    });
