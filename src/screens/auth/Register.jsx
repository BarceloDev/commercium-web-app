import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/1.png";
import axios from "axios";

export default function Register({ showPassword, setShowPassword }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [document, setDocument] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setLoading(true);
    console.log(message);
    console.log(loading);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        {
          name: name,
          user_name: userName,
          email: email,
          email_c: emailConfirm,
          password: password,
          password_c: passwordConfirm,
          telephone: telephone,
          cep: cep,
          city: city,
          state: state,
          cpf_cnpj: document,
        },
      );

      const { user, token, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(message);

      console.log("REGISTER SUCCESS");
      navigate("/");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 422) {
          setErrors(error.response.data.errors);
        } else if (status === 401) {
          setMessage("Unauthorized.");
        } else if (status === 500) {
          setMessage("Internal server error.");
        } else {
          setMessage("Unexpected error.");
        }
      } else {
        setMessage("Server unavailable.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center gap-4 px-4 py-4 text-center">
      <div className="w-full flex justify-starts">
        <Link to={"/"}>
          <i className="bi bi-arrow-left px-4 py-2 rounded-2xl bg-blue-500 text-white hover:bg-blue-700 transition duration-150 ease-in"></i>
        </Link>
      </div>
      <img src={logo} alt="" />
      <p className="font-semibold">Sign up and start managing your sales.</p>
      {message && (
        <p className="w-full p-2 rounded-xl border-2 border-green-400 text-green-400 font-bold">
          {message}
        </p>
      )}
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name[0]}</p>
        )}
        <input
          type="text"
          required
          placeholder="User name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.user_name && (
          <p className="text-red-500 text-sm">{errors.user_name[0]}</p>
        )}
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email[0]}</p>
        )}
        <input
          type="email"
          required
          placeholder="Confirm your email"
          value={emailConfirm}
          onChange={(e) => {
            setEmailConfirm(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.email_c && (
          <p className="text-red-500 text-sm">{errors.email_c[0]}</p>
        )}
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password[0]}</p>
        )}
        <div className="flex gap-2">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Confirm your password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            <i
              className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}
            ></i>
          </button>
        </div>
        {errors.password_c && (
          <p className="text-red-500 text-sm">{errors.password_c[0]}</p>
        )}
        <input
          type="text"
          required
          placeholder="Telephone"
          value={telephone}
          onChange={(e) => {
            setTelephone(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.telephone && (
          <p className="text-red-500 text-sm">{errors.telephone[0]}</p>
        )}
        <input
          type="text"
          required
          placeholder="CEP"
          value={cep}
          onChange={(e) => {
            setCep(e.target.value.replace(/\D/g, ""));
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.cep && <p className="text-red-500 text-sm">{errors.cep[0]}</p>}
        <input
          type="text"
          required
          placeholder="City"
          value={city}
          onChange={(e) => {
            setCep(e.target.value);
          }}
          readOnly
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city[0]}</p>
        )}
        <input
          type="text"
          required
          placeholder="State"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          readOnly
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.state && (
          <p className="text-red-500 text-sm">{errors.state[0]}</p>
        )}
        <input
          type="text"
          required
          placeholder="CPF/CNPJ"
          value={document}
          onChange={(e) => {
            setDocument(e.target.value);
          }}
          className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
        />
        {errors.cpf_cnpj && (
          <p className="text-red-500 text-sm">{errors.cpf_cnpj[0]}</p>
        )}
        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white hover:bg-blue-700 transition duration-150 ease-in p-2 rounded-xl"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
