const buttons = document.querySelectorAll(".addProductToCart");
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.getAttribute("id");
   
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `/api/carts/65b2fc271d61899a7019226c/product/${productId}`;
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  });
});
