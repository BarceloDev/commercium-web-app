import axios from "axios";
import { useState } from "react";

export default function PopUpEditSale({
  saleToEdit,
  setPopUpEditSaleOpen,
  setSales,
  theme,
}) {
  const [formData, setFormData] = useState({
    product_id: saleToEdit.product.id,
    quantity: saleToEdit.quantity,
    consumer: saleToEdit.consumer || "",
    consumer_document: saleToEdit.consumer_document || "",
  });

  async function editSale(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/sales/${saleToEdit.id}`,
        {
          product_id: formData.product_id,
          quantity: formData.quantity,
          consumer: formData.consumer,
          consumer_document: formData.consumer_document,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSales((prevSales) =>
        prevSales.map((sale) =>
          sale.id === saleToEdit.id ? response.data.sale : sale,
        ),
      );

      setPopUpEditSaleOpen(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div className="w-screen h-full absolute top-0 left-0 flex items-center justify-center bg-black/50">
      <div
        className={`${theme === "light" ? "bg-slate-50 text-slate-950" : "bg-slate-800 text-slate-50"} p-6 rounded-2xl transition duration-150 ease-in`}
      >
        <h2 className="text-xl font-bold mb-4">Edit Sale</h2>

        <form onSubmit={editSale}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="product"
            >
              Product
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="product"
              type="text"
              value={saleToEdit.product.name}
              disabled
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="consumer"
            >
              Consumer
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consumer"
              type="text"
              placeholder="Consumer name"
              value={formData.consumer}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  consumer: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="consumer_document"
            >
              Consumer CPF/CNPJ
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consumer_document"
              type="text"
              placeholder="Consumer CPF/CNPJ"
              value={formData.consumer_document}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  consumer_document: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="total"
            >
              Total
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="total"
              type="number"
              value={saleToEdit.total}
              disabled
            />
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Sale
            </button>

            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setPopUpEditSaleOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
