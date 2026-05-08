import axios from "axios";
import { useEffect, useState } from "react";
import PopUpSales from "./popups/PopUpSales";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);

  useEffect(() => {
    async function salesGet() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/sales", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        setSales(response.data.sales);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    }

    salesGet();
  }, []);

  return (
    <div className="w-screen h-full py-4 px-4 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Sales:</h1>
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="flex flex-col p-4 rounded-2xl border border-gray-200"
        >
          <h3 className="font-bold">Product: {sale.product.name}</h3>
          <h3>Quantity: {sale.quantity}</h3>
          <h3>Consumer: {sale.consumer}</h3>
          <h3>
            Consumer CPF/CNPJ:{" "}
            {sale.consumer_document === null
              ? "Not informed"
              : sale.consumer_document}
          </h3>
          <h3>Total: {sale.total}</h3>
        </div>
      ))}
      <div>
        Adicionar venda{" "}
        <button onClick={() => setPopUpOpen((prev) => !prev)}>
          <i className="bi bi-plus-lg py-1 px-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white"></i>
        </button>
      </div>
      {popUpOpen && <PopUpSales />}
    </div>
  );
}
