import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";
import { useGetUserLeaderboardQuery } from "../../stores/back/back.api";
import { ReactElement, useEffect, useState } from "react";
import LeaderboardElement from "./LeaderboardElement";

function Leaderboard() {
  const userName = useAppSelector((state: RootStore) => state.twitch.user.preferred_username);

  const { data, isLoading } = useGetUserLeaderboardQuery(userName);
  const [leaderboardElements, setLeaderboardElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (data) {
      const leaderboardElements = data.leaderboard_members.map((leaderboardElement) => {
        return <LeaderboardElement key={leaderboardElement.nickname} elementProps={leaderboardElement} />;
      });
      setLeaderboardElements(leaderboardElements);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto bg-slate-600 text-gray-200 container py-5 rounded">
      <h2 className="font-bold uppercase text-3xl">Leaderboard</h2>
      <div className="w-full mt-5 mx-10 p-3 flex justify-center items-center ">
        <p className="text-slate-300 font-bold text-xl min-w-[100px] flex justify-center lg:min-w-[400px]">Level</p>
        <p className="text-slate-300 font-bold text-xl min-w-[100px] flex justify-center lg:min-w-[400px]">Nickname</p>
        <p className="text-slate-300 font-bold text-xl min-w-[100px] flex justify-center lg:min-w-[400px]">Experience</p>
      </div>
      {isLoading ? <p className="text-2xl">loading...</p> : <div className="w-full">{leaderboardElements}</div>}
    </div>
  );
}

export default Leaderboard;
