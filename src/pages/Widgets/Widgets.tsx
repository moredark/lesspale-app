import { Link } from "react-router-dom";
import { useGetLeaderboardSecretQuery } from "../../stores/back/back.api";
import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";
import { clipboardCopy } from "../../utils/utils";
import { toast } from "react-toastify";
import copyLogo from "../../assets/copyLogo.png";

function Widgets() {
  const userName = useAppSelector((state: RootStore) => state.twitch.user.preferred_username);
  const { data } = useGetLeaderboardSecretQuery(userName);

  const leaderboardButtonHandler = () => {
    if (data) {
      clipboardCopy(location.origin + "/widget/leaderboard/" + data?.secret);
      toast("Successfully copied");
    }
  };

  return (
    <div className="w-[100%] h-screen mainBg">
      <div className="flex flex-col justify-center items-center mx-auto bg-slate-600 text-gray-200 container py-5 rounded">
        <h2 className="font-bold uppercase text-3xl">Widgets</h2>
        <div className="flex items-center gap-2 mt-4">
          <Link to={"/widget/leaderboard/" + data?.secret}>
            <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-l-md hover:text-gray-100 hover:bg-slate-800 transition-colors">
              Leaderboard
            </p>
          </Link>
          <span
            className="cursor-pointer text-gray-200 text-[24px] bg-slate-700 p-3 rounded-r-md hover:text-gray-100 hover:bg-slate-800 transition-colors"
            onClick={leaderboardButtonHandler}
          >
            <img src={copyLogo} alt="copy" className="w-9" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
