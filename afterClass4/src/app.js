import express from "express";
import { Server } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { ProductManager } from "./classes/ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager("productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
	console.log("servidor esta running en el puerto" + PORT);
});

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
	console.log("nuevo cliente conectado");
	socket.on("addProduct", async (product) => {
		const title = product.title;
		const description = product.description;
		const price = product.price;
		const thumbnail = product.thumbnail;
		const code = product.code;
		const stock = product.stock;
		try {
			// Previamente el método addProduct no retornada nada, por tanto result siempre sería undefined y la instrucción socketServer.emit("updateProducts", allProducts); no se ejecutaría nunca
			// Se modificó el método para que retorne un valor adecuado y la validación correspondiente
			const result = await productManager.addProduct(
				title,
				description,
				price,
				thumbnail,
				code,
				stock
			);

			const allProducts = await productManager.getProducts();
			//console.log(allProducts);
			// Se envía objeto con información para manejar desde el front: success indica si la operación se realizó con éxito, o no, y message aporta información extra. Si ocurre algún error con getProducts allProducts no se agrega al objeto del emit ya que será undefined, se espera que si addProduct finalizó con éxito también lo haría getProducts (se pueden hacer más validaciones)
			socketServer.emit("updateProducts", {
				allProducts,
				success: result.success,
				message: result.message,
			});
		} catch (err) {
			console.log(err);
			socketServer.emit("updateProducts", {
				success: false,
				message: result.message,
			});
		}
	});

	socket.on("deleteProduct", async (id) => {
		try {
			// Previamente el método deleteProductById devolvía tanto en caso de éxito como de fracaso un objeto. Para JavaScript, cualquier tipo de objeto (aún vacío) dentro de un condicional se evalua como true. Por lo tanto, result siempre se evalúa como true y la instrucción socketServer.emit("updateProducts", allProducts); se ejecuta tanto si el producto se eliminó con éxito como si no se pudo eliminar el producto
			// Se modificó el método para que retorne un valor adecuado y la validación correspondiente
			const result = await productManager.deleteProductById(id);
			const allProducts = await productManager.getProducts();

			// Se envía objeto con información para manejar desde el front
			socketServer.emit("updateProducts", {
				allProducts,
				success: result.success,
				message: result.message,
			});
		} catch (err) {
			console.log(err);
		}
	});
});
