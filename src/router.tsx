import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainPage } from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
