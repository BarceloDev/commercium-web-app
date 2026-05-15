import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Configurations({
  theme,
  setTheme,
  consult,
  setConsult,
}) {
  const [enterpriseMode, setEnterpriseMode] = useState(false);
  const [isPhysicalConfig, setIsPhysicalConfig] = useState(false);
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getCepData() {
      if (cep.length !== 8) return;

      try {
        const response = await axios.get(
          `https://brasilapi.com.br/api/cep/v2/${cep}`,
        );

        setCity(response.data.city);
        setState(response.data.state);
      } catch (error) {
        console.error("CEP not found:", error);

        setCity("");
        setState("");
      }
    }

    getCepData();
  }, [cep]);

  const isPhysical = (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="CEP"
        value={cep}
        onChange={(e) => {
          setCep(e.target.value);
        }}
        className="p-2 rounded-xl border border-slate-400"
      />
      <input
        type="text"
        placeholder="City"
        readOnly
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        className="p-2 rounded-xl border border-slate-400"
      />
      <input
        type="text"
        placeholder="State"
        readOnly
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="p-2 rounded-xl border border-slate-400"
      />
    </div>
  );

  const enterprise = (
    <div className="border border-slate-600 p-4 rounded-2xl flex flex-col gap-2">
      <h4>Make your enterprise</h4>
      <input
        type="text"
        className="p-2 rounded-xl border border-slate-400"
        placeholder="Enterprise name"
      />
      <input
        type="email"
        className="p-2 rounded-xl border border-slate-400"
        placeholder="Enterprise email"
      />
      <div>
        Is physical
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsPhysicalConfig(true);
            }}
          >
            <i
              className={`bi ${isPhysicalConfig ? "bi-check-circle-fill" : "bi-check-circle"}`}
            ></i>
          </button>
          Yes
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsPhysicalConfig(false);
              setCep("");
              setCity("");
              setState("");
            }}
          >
            <i
              className={`bi ${!isPhysicalConfig ? "bi-check-circle-fill" : "bi-check-circle"}`}
            ></i>
          </button>
          No
        </div>
      </div>
      {isPhysicalConfig && isPhysical}
    </div>
  );

  async function logout() {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        },
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error);
    }
  }

  return (
    <div
      className={`w-screen h-full py-4 px-4 flex flex-col gap-4 ${theme === "light" ? "text-slate-950 bg-slate-50" : "text-slate-50 bg-slate-800"} transition duration-150 ease-in`}
    >
      <h1 className="text-2xl font-bold">Configurations</h1>
      <p className="text-gray-700">Manage your application settings here.</p>
      <h3 className="text-xl">Theme</h3>
      <div
        className={`w-full p-4 rounded-2xl flex justify-between items-center ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"}`}
      >
        <button
          onClick={() => {
            setTheme((prev) => (prev === "light" ? "dark" : "light"));
          }}
          className={`px-8 py-6 rounded-3xl ${theme === "dark" ? "bg-slate-400" : ""}`}
        >
          Dark
        </button>
        <button
          onClick={() => {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
          }}
          className={`px-8 py-6 rounded-3xl ${theme === "light" ? "bg-slate-50" : ""}`}
        >
          Light
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl">Notifications</h3>
        <p>Mark as read automatically</p>
        <button
          onClick={() => setConsult(!consult)}
          className={`px-4 py-2 rounded-lg ${consult ? "bg-green-500" : "bg-gray-500"} text-white hover:opacity-90 transition duration-150 ease-in w-24`}
        >
          {consult ? "On" : "Off"}
        </button>
      </div>

      <h3 className="text-xl">Enterprise mode</h3>
      <button
        className={`py-2 px-4 w-24 rounded-lg ${enterpriseMode ? "bg-green-500" : "bg-gray-500"} transition text-white`}
        onClick={() => setEnterpriseMode((prev) => !prev)}
      >
        {enterpriseMode ? "On" : "Off"}
      </button>

      {enterpriseMode && enterprise}

      <div className="flex flex-col gap-2">
        Logout
        <button
          className="py-2 px-4 w-30 bg-red-500 text-slate-50 rounded-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        Save Configurations
      </button>
    </div>
  );
}
