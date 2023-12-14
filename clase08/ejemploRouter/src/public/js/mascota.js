const elementExist = (id) => (document.getElementById(id) ? true : false);

const createPet = async (pet) => {
  const response = await fetch("/api/pet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  const data = await response.json();
  alert(data.message);
};

if (elementExist) {
  const button = document.getElementById("createPet");
  button.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const breed = document.getElementById("breed").value;
    const age = document.getElementById("age").value;

    createPet({
      name,
      breed,
      age,
    });
  });
}
