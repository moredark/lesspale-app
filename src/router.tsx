import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TextToSpeech from "./pages/TextToSpeech/TextToSpeech";
import PrivateRoute from "./utils/router/privateRoute";
import { NotFound } from "./pages/NotFound/NotFound.tsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.tsx";
import Widgets from "./pages/Widgets/Widgets.tsx";
import LeaderboardWidget from "./pages/Widgets/LeaderboardWidget/LeaderboardWidget.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/spokenChat" element={<TextToSpeech />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/widgets" element={<Widgets />} />
      </Route>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/widget/leaderboard/:secret" element={<LeaderboardWidget />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
