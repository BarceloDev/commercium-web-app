import { useState, useEffect } from "react";
import axios from "axios";
import PopUpProducts from "./popups/PopUpProducts";
import PopUpEditProduct from "./popups/PopUpEditProduct";

export default function Products({ theme }) {
  const [products, setProducts] = useState([]);
  const [popUpProductsOpen, setPopUpProductsOpen] = useState(false);
  const [popUpEditProductOpen, setPopUpEditProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get("http://127.0.0.1:8000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts(response.data.products);
    }

    getProducts();
  }, []);

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div
      className={`w-screen h-full py-4 px-4 flex flex-col gap-4 ${theme === "light" ? "text-slate-950 bg-slate-50" : "text-slate-50 bg-slate-800"} transition duration-150 ease-in`}
    >
      <h1 className="font-bold text-2xl">Products:</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="flex gap-6 p-4 rounded-2xl border border-gray-200"
            >
              <div className="flex flex-col">
                <h3 className="font-bold">Product: {product.name}</h3>
                <h3>Description: {product.description}</h3>
                <h3>Price: {product.price}</h3>
              </div>
              <div className="flex flex-col gap-8">
                <button onClick={() => deleteProduct(product.id)}>
                  <i className="bi bi-trash py-2 px-2.5 bg-red-500 text-white rounded-xl hover:bg-red-700 transition duration-150 ease-in"></i>
                </button>
                <button
                  onClick={() => {
                    setProductToEdit(product);
                    setPopUpEditProductOpen(true);
                  }}
                >
                  <i className="bi bi-pencil-square py-2 px-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-700 transition duration-150 ease-in"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-2">
        New product{" "}
        <button onClick={() => setPopUpProductsOpen((prev) => !prev)}>
          <i className="bi bi-plus-lg py-1 px-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white"></i>
        </button>
      </div>
      {popUpProductsOpen && (
        <PopUpProducts
          setPopUpProductsOpen={setPopUpProductsOpen}
          setProducts={setProducts}
          theme={theme}
        />
      )}
      {popUpEditProductOpen && (
        <PopUpEditProduct
          productToEdit={productToEdit}
          setPopUpEditProductOpen={setPopUpEditProductOpen}
          setProducts={setProducts}
          theme={theme}
        />
      )}
    </div>
  );
}
