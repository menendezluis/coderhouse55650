const socket = io();

const addProductBtn = document.getElementById("addProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");

addProductBtn.addEventListener("click", () => {
	// Se quitó ".value" de cada elemento ya que se guarda el valor en la constante y luego no puede ser modificado, además se pierde la conexión con el elemento del DOM ya que solo se almacena el valor
	const title = document.getElementById("title");
	const description = document.getElementById("description");
	const price = document.getElementById("price");
	const thumbnail = document.getElementById("thumbnail");
	const code = document.getElementById("code");
	const stock = document.getElementById("stock");

	// Se corrigió la forma en la que se genera el producto para utilizar los valores de los campos del formulario
	const product = {
		title: title.value,
		description: description.value,
		price: price.value,
		thumbnail: thumbnail.value,
		code: code.value,
		stock: stock.value,
	};

	socket.emit("addProduct", product);

	// Con los cambios anteriores, las siguientes líneas cobran sentido, anteriormente no se podía acceder a value del elemento ya que se hacía algo como valor.value = "" (sin efecto)
	title.value = "";
	description.value = "";
	price.value = "";
	thumbnail.value = "";
	code.value = "";
	stock.value = "";
});

deleteProductBtn.addEventListener("click", () => {
	// Se aplicaron los mismos cambios que para el evento anterior
	const id = document.getElementById("productId");
	// console.log(id);
	socket.emit("deleteProduct", id.value);
	id.value = "";
});

socket.on("updateProducts", (data) => {
	/* 
	Desde el servidor se envía un objeto de este formato:
	{
		allProducts,
		success: result.success,
		message: result.message,
	};
	*/
	// Se valida que la operación terminó con éxito y de ser el caso de renderiza la lista de productos sin recargar la página, en caso de que no haya sido exitoso se muestra el mensaje enviado desde el servidor al cliente
	if (data.success) {
		const productList = document.querySelector(".productList");
		// Se vacía lista existente en front
		productList.innerHTML = "";
		// Por cada producto se crea un elemento "div" de clase "productCard" y se anexa dentro del div "productList"
		data.allProducts.forEach((product) => {
			const card = document.createElement("div");
			card.classList.add("productCard");
			card.innerHTML = `
									<div class="cardProduct__image">
										<img src=${product.thumbnail} alt=${product.title} />
									</div>
									<div class="cardProduct__info">

										<h3>${product.title}</h3>
										<p>${product.description}</p>
										<p>${product.price}</p>
										<p>${product.stock}</p>
										<p>${product.code}</p>
										<p>${product.id}</p>
									</div>
									`;
			productList.appendChild(card);
		});
		alert(data.message);
		return;
	} else {
		alert(data.message);
	}

	// Alternativa sencilla:
	//window.location.reload();
});
