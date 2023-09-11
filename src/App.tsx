import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router";
import { useConnectToAppMutation } from "./stores/back/back.api";
import { useActions } from "./hooks/actions";
import { ToastContainer } from "react-toastify";
import { useLazyGetSecretDataQuery, useLazyGetUserInfoQuery } from "./stores/twitch/twitch.api";
import { useAppSelector } from "./hooks/redux";
import { RootStore } from "./stores";
import NavBar from "./components/Navbar/NavBar";

function App() {
  const accessToken = useAppSelector((state: RootStore) => state.twitch.token);

  const [getToken] = useLazyGetSecretDataQuery();
  const [connectToApp] = useConnectToAppMutation();
  const [getUser] = useLazyGetUserInfoQuery();
  const { setToken, setUser } = useActions();
  const code = new URLSearchParams(window.location.search).get("code");

  const handleTokenAndUser = async (code:string) => {
    try {
      const resFromTwitch = await getToken(code).unwrap();
      console.log(resFromTwitch);

      const resFromServer = await connectToApp(resFromTwitch.access_token).unwrap();
      console.log(resFromServer);
      setToken(resFromServer.access_token);

      const user = await getUser(resFromTwitch.access_token).unwrap();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (code) {
      handleTokenAndUser(code);
    }
  }, [code]);

  return (
    <div className="app">
      {accessToken && <NavBar />}
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
