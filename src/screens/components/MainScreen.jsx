import { useState } from "react";
import Header from "./Header/Header";
import Sales from "./pages/Sales";
import Dashboard from "./pages/Dashboard";
import Configurations from "./pages/Configurations";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

export default function MainScreen() {
  const [content, setContent] = useState("dashboard");

  let show;

  switch (content) {
    case "dashboard":
      show = <Dashboard />;
      break;

    case "sales":
      show = <Sales />;
      break;

    case "config":
      show = <Configurations />;
      break;

    case "profile":
      show = <Profile />;
      break;

    case "products":
      show = <Products />;
      break;

    default:
      show = <Dashboard />;
      break;
  }

  return (
    <div>
      <Header setContent={setContent} />
      <div className="py-40">{show}</div>
    </div>
  );
}
