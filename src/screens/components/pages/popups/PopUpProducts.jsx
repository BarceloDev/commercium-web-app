import { useState } from "react";
import axios from "axios";

export default function PopUpProducts({
  setPopUpProductsOpen,
  setProducts,
  theme,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products",
        {
          name: name,
          description: description,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const newProduct = response.data.product;
      setProducts((prevProducts) => [newProduct, ...prevProducts]);
      setPopUpProductsOpen((prev) => !prev);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div
        className={`${theme === "light" ? "bg-slate-50 text-slate-950" : "bg-slate-800 text-slate-50"} w-full max-w-md rounded-xl p-6 shadow-2xl transition duration-150 ease-in`}
      >
        <h2 className="text-2xl font-bold mb-6">Register product</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
              onClick={() => setPopUpProductsOpen(false)}
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
