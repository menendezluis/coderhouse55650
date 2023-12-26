import utils from "../utils.js";
import crypto from "crypto";

export class ProductManager {
	constructor(path) {
		this.path = path;
		this.products = [];
	}
	//static correlativoId = 0;
	async addProduct(title, description, price, thumbnail, code, stock) {
		//id: this.products.length +1,
		// En todos los casos, tanto de éxito como de fracaso, el método retorna un valor que se podrá comunicar al cliente
		if (
			title == undefined ||
			description == undefined ||
			price == undefined ||
			thumbnail == undefined ||
			code == undefined ||
			stock == undefined
		) {
			//throw new Error("Todos los campos son obligatorios");
			return {
				success: false,
				message: "Todos los campos son obligatorios",
			};
		}
		try {
			let data = await utils.readFile(this.path);
			this.products = data?.length > 0 ? data : [];
		} catch (error) {
			return {
				success: false,
				message: "Ocurrió un error en el servidor",
			};
			//console.log(error);
		}

		let codeExists = this.products.some((dato) => dato.code == code);

		if (codeExists) {
			// throw new Error("El codigo ya existe por favor verifique");
			return {
				success: false,
				message: "El codigo ya existe por favor verifique",
			};
		} else {
			const newProduct = {
				id: crypto.randomUUID(),
				title,
				description,
				price,
				thumbnail,
				code,
				stock,
			};
			this.products.push(newProduct);
			try {
				await utils.writeFile(this.path, this.products);
			} catch (error) {
				return {
					success: false,
					message: "No se pudo registrar el nuevo producto",
				};
			}

			return {
				success: true,
				message: `El producto ${newProduct.title} se registró con éxito`,
			};
		}
	}
	async getProducts() {
		try {
			let data = await utils.readFile(this.path);
			this.products = data;
			return data?.length > 0 ? this.products : "aun no hay registros";
		} catch (error) {
			console.log(error);
		}
	}
	async getProductById(id) {
		try {
			let data = await utils.readFile(this.path);
			this.products = data?.length > 0 ? data : [];
			let product = this.products.find((dato) => dato.id === id);

			if (product !== undefined) {
				return product;
			} else {
				return "no existe el producto solicitado";
			}
		} catch (error) {
			console.log(error);
		}
	}

	async updateProductById(id, data) {
		try {
			let products = await utils.readFile(this.path);
			this.products = products?.length > 0 ? products : [];

			let productIndex = this.products.findIndex(
				(dato) => dato.id === id
			);
			if (productIndex !== -1) {
				this.products[productIndex] = {
					...this.products[productIndex],
					...data,
				};
				await utils.writeFile(this.path, products);
				return {
					mensaje: "producto actualizado",
					producto: this.products[productIndex],
				};
			} else {
				return { mensaje: "no existe el producto solicitado" };
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProductById(id) {
		// Se modificaron los formatos de los objetos que se devuelven para ajustar a la validación e información transmitida al cliente
		try {
			let products = await utils.readFile(this.path);
			this.products = products?.length > 0 ? products : [];
			let productIndex = this.products.findIndex(
				(dato) => dato.id === id
			);
			if (productIndex !== -1) {
				let product = this.products[productIndex];
				this.products.splice(productIndex, 1);
				await utils.writeFile(this.path, products);
				return {
					success: true,
					message: `Producto ${product.title} eliminado con éxito`,
				};
			} else {
				return {
					success: false,
					message: "No existe el producto solicitado",
				};
			}
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Ocurrió un error al eliminar el producto",
			};
		}
	}
}

export default {
	ProductManager,
}; //modulos

/*module.exports = {
  ProductManager,
};//commonJS*/
