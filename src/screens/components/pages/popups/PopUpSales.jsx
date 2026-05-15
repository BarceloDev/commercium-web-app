import axios from "axios";
import { useEffect, useState } from "react";

export default function PopUpSales({ setPopUpOpen, setSales, theme }) {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [consumer, setConsumer] = useState("");
  const [document, setDocument] = useState("");

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

  const selectedProduct = products.find(
    (product) => product.id === Number(productId),
  );

  const total = selectedProduct ? selectedProduct.price * quantity : 0;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sales",
        {
          product_id: productId,
          quantity: quantity,
          consumer: consumer,
          consumer_document: document,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const newSale = response.data.sale;
      setSales((prevSales) => [newSale, ...prevSales]);
      setPopUpOpen(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div
        className={`${theme === "light" ? "bg-slate-50 text-slate-950" : "bg-slate-800 text-slate-50"} w-full max-w-md rounded-xl p-6 shadow-2xl transition duration-150 ease-in`}
      >
        <h2 className="text-2xl font-bold mb-6">Register Sale</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <select
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Selecione um produto</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />

          <input
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Consumer"
            value={consumer}
            onChange={(e) => setConsumer(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Consumer CPF/CNPJ"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-lg p-3 bg-gray-100"
            type="text"
            value={`R$ ${total.toFixed(2)}`}
            readOnly
          />

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => setPopUpOpen(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
