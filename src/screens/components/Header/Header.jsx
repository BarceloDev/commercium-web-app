import logo from "../../../assets/2.png";
import { useState } from "react";

export default function Header({ setContent }) {
  const [navBarOpen, setNavBarOpen] = useState(false);

  const navBar = (
    <nav className="flex flex-col border-b-2 border-gray-200">
      <button
        onClick={() => {
          setContent("dashboard");
          setNavBarOpen(false);
        }}
        className="w-full py-4 hover:bg-gray-200 focus:bg-gray-200"
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          setContent("sales");
          setNavBarOpen(false);
        }}
        className="w-full py-4 hover:bg-gray-200 focus:bg-gray-200"
      >
        Sales
      </button>
      <button
        onClick={() => {
          setContent("products");
          setNavBarOpen(false);
        }}
        className="w-full py-4 hover:bg-gray-200 focus:bg-gray-200"
      >
        Products
      </button>
      <button
        onClick={() => {
          setContent("config");
          setNavBarOpen(false);
        }}
        className="w-full py-4 hover:bg-gray-200 focus:bg-gray-200"
      >
        Configuration
      </button>
      <button
        onClick={() => {
          setContent("profile");
          setNavBarOpen(false);
        }}
        className="w-full py-4 hover:bg-gray-200 focus:bg-gray-200"
      >
        Profile
      </button>
    </nav>
  );

  return (
    <div className="w-screen fixed bg-white z-50">
      <header className="border-b-2 border-gray-100 w-full flex justify-between items-center pb-2 px-6">
        <img src={logo} alt="" className="w-20 h-20" />
        <nav className="hidden text-lg font-medium md:flex">
          <button
            onClick={() => {
              setContent("dashboard");
              setNavBarOpen(false);
            }}
            className="w-full py-4 hover:font-semibold transition duration-150 ease-in mx-5"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setContent("sales");
              setNavBarOpen(false);
            }}
            className="w-full py-4 hover:font-semibold transition duration-150 ease-in mx-5"
          >
            Sales
          </button>
          <button
            onClick={() => {
              setContent("products");
              setNavBarOpen(false);
            }}
            className="w-full py-4 hover:font-semibold transition duration-150 ease-in mx-5"
          >
            Products
          </button>
          <button
            onClick={() => {
              setContent("config");
              setNavBarOpen(false);
            }}
            className="w-full py-4 hover:font-semibold transition duration-150 ease-in mx-5"
          >
            Configuration
          </button>
          <button
            onClick={() => {
              setContent("profile");
              setNavBarOpen(false);
            }}
            className="w-full py-4 hover:font-semibold transition duration-150 ease-in mx-5"
          >
            Profile
          </button>
        </nav>
        <button
          onClick={() => {
            setNavBarOpen((prev) => !prev);
          }}
          className="text-2xl md:hidden"
        >
          <i className={`bi ${navBarOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
      </header>
      <div>{navBarOpen && navBar}</div>
    </div>
  );
}
