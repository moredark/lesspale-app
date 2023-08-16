import { Navigate } from "react-router-dom";

export default function LoginPage() {
  return (localStorage.getItem("TAK") ? (
    <Navigate to="/" />
  ) : (
    <div>
      <div className="flex flex-col">
        <a
          href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${
            import.meta.env.VITE_REDIRECT_URL
          }&scope=user%3Aedit%20user%3Aread%3Aemail&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"picture":null}}`}
        >
          Connect Twitch
        </a>
      </div>
    </div>
  ));
}
