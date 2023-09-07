import { useOAuth2 } from "@tasoskakour/react-use-oauth2";
import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router";
import NavBar from "./components/Navbar/NavBar";
import { useConnectToAppMutation } from "./stores/back/back.api";
import { useActions } from "./hooks/actions";
import { ToastContainer } from "react-toastify";
import { useLazyGetUserInfoQuery } from "./stores/twitch/twitch.api";

function App() {
  const [connectToApp, { data }] = useConnectToAppMutation();
  const [getUser, {}] = useLazyGetUserInfoQuery();
  const { setToken, setUser } = useActions();
  const twitchAuth = useOAuth2({
    authorizeUrl: "https://id.twitch.tv/oauth2/authorize",
    clientId: import.meta.env.VITE_CLIENT_ID,
    redirectUri: `http://${window.location.host}/callback`,
    scope: "chat:read",
    responseType: "code",
    exchangeCodeForTokenServerURL: "https://id.twitch.tv/oauth2/token?client_secret=" + import.meta.env.VITE_CLIENT_SECRET,
    exchangeCodeForTokenMethod: "POST",
    onSuccess: (payload) => {
      connectToApp(payload.access_token).unwrap();
      getUser(payload.access_token)
        .unwrap()
        .then((userData) => {
          setUser(userData);
        });
    },
    onError: (error_) => console.log("Error", error_),
  });

  useEffect(() => {
    if (data) {
      setToken(data.access_token);
    }
  }, [data]);

  return (
    <div className="app">
      {twitchAuth.data?.access_token && <NavBar />}
      <AppRouter getAuth={twitchAuth.getAuth} />
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
