import React, { useState, useEffect } from "react";
import Card from "../Card";
import PrevNext from "../PrevNext";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const BASE_URL = "http://localhost:8080/api/products";
  const getDataFromApi = async (limit) => {
    limit = limit || 10;
    const response = await fetch(
      `${BASE_URL}?limit=${limit}&page=${currentPage}`
    );
    const data = await response.json();
    return data;
  };

  const handlePage = (page) => {
    setCurrentPage(currentPage + page);
  };
  useEffect(() => {
    getDataFromApi(3).then((data) => {
      console.log(data.products.hasPrevPage);
      console.log(data.products.hasNextPage);
      setProducts(data.products.docs);
      setHasPrev(data.products.hasPrevPage);
      setHasNext(data.products.hasNextPage);
    });
  }, [currentPage]);

  return (
    <div>
      <div className="grid grid-cols-3	">
        {products?.map((product) => (
          <Card key={product.code}>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </Card>
        ))}
      </div>
      <PrevNext
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        handlePage={(value) => handlePage(value)}
      />
    </div>
  );
}

export default ProductList;
