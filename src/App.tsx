import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./router";
import { useConnectToAppMutation } from "./stores/back/back.api";
import { useActions } from "./hooks/actions";
import { ToastContainer } from "react-toastify";
import { useLazyGetSecretDataQuery, useLazyGetUserInfoQuery } from "./stores/twitch/twitch.api";
import { useAppSelector } from "./hooks/redux";
import { RootStore } from "./stores";
import NavBar from "./components/Navbar/NavBar";
import Loader from "./components/Loader/Loader";

function App() {
  const accessToken = useAppSelector((state: RootStore) => state.twitch.token);
  const [loginLoading, setLoginLoading] = useState(false);

  const [getToken] = useLazyGetSecretDataQuery();
  const [connectToApp] = useConnectToAppMutation();
  const [getUser] = useLazyGetUserInfoQuery();
  const { setToken, setUser } = useActions();
  const code = new URLSearchParams(window.location.search).get("code");

  const handleTokenAndUser = async (code: string) => {
    setLoginLoading(true);
    try {
      const resFromTwitch = await getToken(code).unwrap();

      const resFromServer = await connectToApp(resFromTwitch.access_token).unwrap();
      setToken(resFromServer.access_token);

      const user = await getUser(resFromTwitch.access_token).unwrap();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
    setLoginLoading(false);
  };

  useEffect(() => {
    if (code) {
      handleTokenAndUser(code);
    }
  }, [code]);

  return (
    <>
      {loginLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div>
            <Loader />
            <h2 className="text-gray-300 mt-2 text-2xl">wait a little while :3</h2>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default App;
