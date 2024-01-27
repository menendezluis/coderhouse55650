import express from "express"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()
const PORT = 8080

let productos = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
  res.send("hola mundo")
});

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(PORT, () => {
  console.log("servidor esta running en el puerto" + PORT)
})
