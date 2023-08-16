import { Route, Routes, useSearchParams } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useLazyGetAuthorizationQuery } from "./stores/twitch/twitch.api";
import { useEffect, useState } from "react";
import { useActions } from "./hooks/actions";
import PrivateRoute from "./utils/router/privateRoute";
import { MainPage } from "./pages/MainPage/MainPage";
import TextToSpeech from "./pages/TextToSpeech/TextToSpeech";

function App() {
  const [searchParams] = useSearchParams();

  const [code] = useState(searchParams.get("code"));
  const [getAuthorization, { data, isError }] = useLazyGetAuthorizationQuery();
  const { setAuth } = useActions();

  useEffect(() => {
    if (code) {
      getAuthorization(code);
    }
  }, [code]);

  useEffect(() => {
    if (data) {
      setAuth(data);
    }
  }, [data]);

  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/textToSpeech" element={<TextToSpeech />} />
        </Route>
        <Route path="/auth" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
