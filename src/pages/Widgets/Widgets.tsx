import { Link } from "react-router-dom";
import { useGetLeaderboardSecretQuery } from "../../stores/back/back.api";
import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";
import { clipboardCopy } from "../../utils/utils";
import { toast } from "react-toastify";

function Widgets() {
  const userName = useAppSelector((state: RootStore) => state.twitch.user.preferred_username);
  const { data } = useGetLeaderboardSecretQuery(userName);

  return (
    <div className="w-[100%] h-screen mainBg">
      <div className="flex flex-col justify-center items-center mx-auto bg-slate-600 text-gray-200 container py-5 rounded">
        <div className="flex items-center gap-2">
          <Link to={"/widget/leaderboard/" + data?.secret}>
            <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-l-md hover:text-gray-100 hover:bg-slate-800 transition-colors">
              Leaderboard
            </p>
          </Link>
          <span
            className="cursor-pointer text-gray-200 text-[24px] bg-slate-700 p-3 rounded-r-md hover:text-gray-100 hover:bg-slate-800 transition-colors"
            onClick={() => {
              clipboardCopy(location.host + "/widget/leaderboard/" + data?.secret);
              toast("Successfully copied");
            }}
          >
            <svg height="36" viewBox="0 0 30 30" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5 6c-.66 0-.648 1 0 1h3c.286 0 .5.214.5.5v21c0 .286-.214.5-.5.5h-21c-.286 0-.5-.214-.5-.5v-3c0-.66-1-.664-1 0v3c0 .822.678 1.5 1.5 1.5h21c.822 0 1.5-.678 1.5-1.5v-21c0-.822-.678-1.5-1.5-1.5zm-24-6C.678 0 0 .678 0 1.5v21c0 .822.678 1.5 1.5 1.5h21c.822 0 1.5-.678 1.5-1.5v-21c0-.822-.678-1.5-1.5-1.5zm0 1h21c.286 0 .5.214.5.5v21c0 .286-.214.5-.5.5h-21c-.286 0-.5-.214-.5-.5v-21c0-.286.214-.5.5-.5z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
