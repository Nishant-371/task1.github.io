import { useState, useEffect } from "react";

export const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );
        const print = await response.json();

        const productArray = Object.entries(print.products).map(
          ([id, product]) => ({
            id,
            ...product,
          })
        );

        const sortedProducts = productArray.sort(
          (a, b) => b.popularity - a.popularity
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>Title:</strong> {product.title},<strong>Price:</strong>{" "}
            {product.price},<strong>Popularity:</strong>
            {product.popularity}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
