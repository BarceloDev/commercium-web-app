import logo from "../../assets/1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login({ showPassword, setShowPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        { email, password },
      );

      const { user, token, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(message);
      setMessageType("success");

      console.log("LOGIN SUCCESS");

      navigate("/main");
    } catch (error) {
      setMessageType("error");

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
    <div className="bg-blue-500 flex items-center justify-center h-screen">
      <div className="w-screen md:w-200 h-screen flex flex-col justify-center items-center gap-4 px-4 md:px-8 text-center md:bg-white">
        {" "}
        <img src={logo} alt="" />{" "}
        <p className="font-semibold">
          {" "}
          Log in with your account to access the system.{" "}
        </p>{" "}
        {message && (
          <p
            className={`w-full p-2 rounded-xl border-2 font-bold ${messageType === "success" ? "border-green-400 text-green-400" : "border-red-400 text-red-400"}`}
          >
            {" "}
            {message}{" "}
          </p>
        )}{" "}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {" "}
          <div>
            {" "}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
            />{" "}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1"> {errors.email[0]} </p>
            )}{" "}
          </div>{" "}
          <div>
            {" "}
            <div className="flex gap-2">
              {" "}
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full p-2 rounded-xl border border-slate-600 outline-none focus:border-blue-600"
              />{" "}
              <button
                type="button"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {" "}
                <i
                  className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}
                ></i>{" "}
              </button>{" "}
            </div>{" "}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {" "}
                {errors.password[0]}{" "}
              </p>
            )}{" "}
          </div>{" "}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white hover:bg-blue-700 transition duration-150 ease-in p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {" "}
            {loading ? "Loading..." : "Login"}{" "}
          </button>{" "}
        </form>{" "}
        <p>
          {" "}
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-500 hover:underline hover:text-blue-700 transition duration-150 ease-in"
          >
            {" "}
            Register{" "}
          </Link>{" "}
        </p>{" "}
      </div>
    </div>
  );
}
