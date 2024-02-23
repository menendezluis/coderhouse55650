const character = "luis";

type language = "es" | "en" | "fr";

interface levelOfLanguage {
  language: language;
  level: number;
}

interface Person {
  name: string;
  age: number;
  gender: string;
  languages: levelOfLanguage[];
  country?: string | null | undefined;
}

const person: Person = {
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

clickAdd?.addEventListener("click", () => {
  inputs.forEach((input) => {
    console.log(input);
  });
});
