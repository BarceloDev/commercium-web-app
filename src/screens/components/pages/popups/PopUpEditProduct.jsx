import axios from "axios";
import { useState } from "react";

export default function PopUpEditProduct({
  productToEdit,
  setPopUpEditProductOpen,
  setProducts,
}) {
  if (!productToEdit) return null;

  const [formData, setFormData] = useState(() => ({
    name: productToEdit.name || "",
    description: productToEdit.description || "",
    price: productToEdit.price || "",
  }));

  async function editProduct(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/products/${productToEdit.id}`,
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productToEdit.id ? response.data.product : product,
        ),
      );

      setPopUpEditProductOpen(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={editProduct} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>

            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>

            <input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Product
            </button>

            <button
              type="button"
              className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setPopUpEditProductOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
