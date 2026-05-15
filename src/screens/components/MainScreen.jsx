import { useState } from "react";
import Header from "./Header/Header";
import Sales from "./pages/Sales";
import Dashboard from "./pages/Dashboard";
import Configurations from "./pages/Configurations";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

export default function MainScreen() {
  const [content, setContent] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  const [consult, setConsult] = useState(false);

  let show;

  switch (content) {
    case "dashboard":
      show = <Dashboard theme={theme} />;
      break;

    case "sales":
      show = <Sales theme={theme} />;
      break;

    case "config":
      show = (
        <Configurations
          theme={theme}
          setTheme={setTheme}
          consult={consult}
          setConsult={setConsult}
        />
      );
      break;

    case "profile":
      show = <Profile theme={theme} />;
      break;

    case "products":
      show = <Products theme={theme} />;
      break;

    case "notifications":
      show = <Notifications theme={theme} consult={consult} />;
      break;

    default:
      show = <Dashboard theme={theme} />;
      break;
  }

  return (
    <div
      className={`w-screen h-full ${theme === "light" ? "text-slate-950 bg-slate-50" : "text-slate-50 bg-slate-800"} transition duration-150 ease-in`}
    >
      <Header setContent={setContent} setTheme={setTheme} />
      <div className="pt-40 pb-10">{show}</div>
    </div>
  );
}
