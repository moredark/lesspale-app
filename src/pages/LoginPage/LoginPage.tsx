import { Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";

// const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${
//   import.meta.env.VITE_REDIRECT_URL
// }&scope=openid+user%3Aread%3Aemail&claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"email":null,"email_verified":null,"picture":null,"updated_at":null,"preferred_username":null}}&state=c3ab8aa609ea11e793ae92361f002671`;

interface ILoginPageProps {
  getAuth(): void;
}

function LoginPage({ getAuth }: ILoginPageProps) {
  const userInfo = useAppSelector((state: RootStore) => state.twitch.user);

  if (userInfo.preferred_username) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-slate-700 p-4 rounded shadow-2xl w-96">
        <div className="text-center">
          <h2 className="text-5xl text-gray-400 uppercase">Lesspale</h2>
          <p className="text-xl text-gray-400 mt-4">The web app that revolutionized the Twitch industry</p>
        </div>

        <img className="mx-auto h-auto w-9/12" src={logo} alt="moredarkie" />

        <div
          onClick={() => {
            getAuth();
          }}
          className="bg-purple-900 hover:bg-opacity-100 hover:text-white text-center text-lg p-5 shadow-md text-gray-400"
        >
          Login with Twitch
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
