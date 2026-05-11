import axios from "axios";
import { useEffect, useState } from "react";
import PopUpSales from "./popups/PopUpSales";
import PopUpEditSale from "./popups/PopUpEditSale";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpEditSaleOpen, setPopUpEditSaleOpen] = useState(false);
  const [saleToEdit, setSaleToEdit] = useState(null);

  useEffect(() => {
    async function salesGet() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/sales", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSales(response.data.sales);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    }

    salesGet();
  }, []);

  async function deleteSale(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div className="w-screen h-full py-4 px-4 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Sales:</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="flex p-4 gap-6 rounded-2xl border border-gray-200"
          >
            <div className="flex flex-col">
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
            <div className="flex flex-col gap-8">
              <button onClick={() => deleteSale(sale.id)}>
                <i className="bi bi-trash py-2 px-2.5 bg-red-500 text-white rounded-xl hover:bg-red-700 transition duration-150 ease-in"></i>
              </button>
              <button
                onClick={() => {
                  setSaleToEdit(sale);
                  setPopUpEditSaleOpen(true);
                }}
              >
                <i className="bi bi-pencil-square py-2 px-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-700 transition duration-150 ease-in"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        Adicionar venda{" "}
        <button onClick={() => setPopUpOpen((prev) => !prev)}>
          <i className="bi bi-plus-lg py-1 px-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white"></i>
        </button>
      </div>
      {popUpOpen && (
        <PopUpSales setPopUpOpen={setPopUpOpen} setSales={setSales} />
      )}
      {popUpEditSaleOpen && (
        <PopUpEditSale
          saleToEdit={saleToEdit}
          setPopUpEditSaleOpen={setPopUpEditSaleOpen}
          setSales={setSales}
        />
      )}
    </div>
  );
}
