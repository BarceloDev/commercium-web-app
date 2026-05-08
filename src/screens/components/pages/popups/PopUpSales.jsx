import axios from "axios";
import { useEffect, useState } from "react";

export default function PopUpSales() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    async function productGet() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setProducts(response.data.products);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    }

    productGet();
  }, []);

  return (
    <div>
      <form>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Selecione um produto</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
