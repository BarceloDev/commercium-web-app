import { Route, Routes } from "react-router-dom";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import MainScreen from "./screens/components/MainScreen";
import { useState } from "react";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Routes>
      <Route
        index
        element={
          <Login
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        }
      />
      <Route path="/main" element={<MainScreen />} />
    </Routes>
  );
}
