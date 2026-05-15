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
        className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
      >
        Dashboard
        <i className="bi bi-bar-chart-line"></i>
      </button>
      <button
        onClick={() => {
          setContent("sales");
          setNavBarOpen(false);
        }}
        className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
      >
        Sales
        <i className="bi bi-card-checklist"></i>
      </button>
      <button
        onClick={() => {
          setContent("products");
          setNavBarOpen(false);
        }}
        className="w-full flex gap-1 justify-center  py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
      >
        Products
        <i className="bi bi-basket2"></i>
      </button>
      <button
        onClick={() => {
          setContent("notifications");
          setNavBarOpen(false);
        }}
        className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
      >
        Notifications
        <i className="bi bi-bell"></i>
      </button>
      <button
        onClick={() => {
          setContent("config");
          setNavBarOpen(false);
        }}
        className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
      >
        Configuration
        <i className="bi bi-gear"></i>
      </button>
      <button
        onClick={() => {
          setContent("profile");
          setNavBarOpen(false);
        }}
        className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
      >
        Profile
        <i className="bi bi-person-circle"></i>
      </button>
    </nav>
  );

  return (
    <div className="w-screen fixed bg-white z-50">
      <header className="border-b-2 border-gray-100 w-full flex justify-between items-center pb-2 px-6">
        <img src={logo} alt="" className="w-20 h-20" />
        <nav className="hidden text-lg font-medium md:flex gap-8">
          <button
            onClick={() => {
              setContent("dashboard");
              setNavBarOpen(false);
            }}
            className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
          >
            Dashboard
            <i className="bi bi-bar-chart-line"></i>
          </button>
          <button
            onClick={() => {
              setContent("sales");
              setNavBarOpen(false);
            }}
            className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
          >
            Sales
            <i className="bi bi-card-checklist"></i>
          </button>
          <button
            onClick={() => {
              setContent("products");
              setNavBarOpen(false);
            }}
            className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
          >
            Products
            <i className="bi bi-basket2"></i>
          </button>
          <button
            onClick={() => {
              setContent("notifications");
              setNavBarOpen(false);
            }}
            className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
          >
            Notifications
            <i className="bi bi-bell"></i>
          </button>
          <button
            onClick={() => {
              setContent("config");
              setNavBarOpen(false);
            }}
            className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
          >
            Configuration
            <i className="bi bi-gear"></i>
          </button>
          <button
            onClick={() => {
              setContent("profile");
              setNavBarOpen(false);
            }}
            className="w-full flex gap-1 justify-center py-4 hover:bg-gray-200 focus:bg-gray-200 text-slate-950"
          >
            Profile
            <i className="bi bi-person-circle"></i>
          </button>
        </nav>
        <button
          onClick={() => {
            setNavBarOpen((prev) => !prev);
          }}
          className="text-2xl md:hidden"
        >
          <i
            className={`bi ${navBarOpen ? "bi-x-lg" : "bi-list"} text-slate-950`}
          ></i>
        </button>
      </header>
      <div>{navBarOpen && navBar}</div>
    </div>
  );
}
