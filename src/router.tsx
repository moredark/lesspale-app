import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TextToSpeech from "./pages/TextToSpeech/TextToSpeech";
import PrivateRoute from "./utils/router/privateRoute";
import { OAuthPopup } from "@tasoskakour/react-use-oauth2";
import { NotFound } from "./pages/NotFound/NotFound.tsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/spokenChat" element={<TextToSpeech />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/callback" element={<OAuthPopup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
