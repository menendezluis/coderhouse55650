// Esta función que cambiar la imagen principal del producto
function changeImage(element) {
  var main_prodcut_image = document.getElementById("main_product_image");
  main_prodcut_image.src = element.src;
}

// Abre y cierra el detalle del producto
function toggleDetailsProducts() {
  document.getElementById("product-details").classList.toggle("d-none");
  document.getElementById("pagination").classList.toggle("d-none");
  document.getElementById("navbar-top").classList.toggle("d-none");
}

function addProdutAndCloseDetails(id) {
  addProduct(id);
  toggleDetailsProducts();
}

const showDetailedInfo = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const { product } = data;
    const productDetails = document.getElementById("product-details");

    const productDetailsHtml = `
    <figure class="card-product-details  card-product-grid card-lg">
    ${product.thumbnail
      .map((img) => {
        return ` 
    <a href="#" class="img-wrap" data-abc="true"> 
    <img src="${img.img1}"> 
     </a>
    `;
      })
      .join("")}
        <figcaption class="info-wrap">
            <div class="row">
                <div class="col-md-9 col-xs-9"> 
                <a href="#" class="title" data-abc="true">
                ${product.title}</a> 
                <span class="rated">${product.category}</span> 
                </div>
                <div class="col-md-3 col-xs-3">
                    <div class="rating text-right text-danger"> 
                    <i class="fa fa-star"></i> 
                    <i class="fa fa-star"></i> 
                    <i class="fa fa-star"></i> 
                    <i class="fa fa-star"></i> 
                  </div>
                </div>
            </div>
        </figcaption>
        <div class="bottom-wrap-payment">
            <figcaption class="info-wrap">
                <div class="row">
                    <div class="col-md-9 col-xs-9"> 
                      <span class="title">
                        $ ${(product.price * 0.85).toFixed(2)}
                      </span> 
                      <span class="rated text-danger"> 
                        <s>$ ${product.price}</s>
                      </span> 
                    </div>
                    <div class="col-md-3 col-xs-3">
                        <div class="rating text-right">Envio gratis</div>
                    </div>
                </div>
            </figcaption>
        </div>
        <div class="bottom-wrap d-flex justify-content-between "> <button
        onclick="addProdutAndCloseDetails('${
          product._id
        }')" class="btn-product-details  btn-primary float-right">Comprar</button>
            <div class="price-wrap"> <button onclick=toggleDetailsProducts() class="btn-product-details  btn-warning link-dark float-left" data-abc="true">Cerrar</button> </div>
        </div>
    </figure>
    `;

    productDetails.innerHTML = productDetailsHtml;
    toggleDetailsProducts();
  } catch (error) {
    console.error(error);
  }
};
