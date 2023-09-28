import { useEffect, useState } from "react";
import { LeaderboardMember } from "../../../models/models";
import { useParams } from "react-router-dom";
import LeaderboardWidgetElement from "./LeaderboardWidgetElement";

function LeaderboardWidget() {
  const { secret } = useParams();
  const [leaderboardElements, setLeaderboardElements] = useState([]);

  const leaderboardWs = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}leaderboard/?secret=${secret}`);

  useEffect(() => {
    leaderboardWs.addEventListener("open", function () {
      console.log("Websocket connected");
      leaderboardWs.send(
        JSON.stringify({
          action: "join_room",
          request_id: new Date().getTime(),
        })
      );
    });

    leaderboardWs.addEventListener("message", function (event) {
      const response = JSON.parse(event.data);
      console.log(response);
      if (response.leaderboard) {
        const leaderboardElements = response.leaderboard.map((leaderboardElement: LeaderboardMember, index: number) => {
          return <LeaderboardWidgetElement key={leaderboardElement.nickname} index={index} elementProps={leaderboardElement} />;
        });
        setLeaderboardElements(leaderboardElements);
      }
    });

    leaderboardWs.addEventListener("close", function () {
      console.log("Connection closed");
    });

    return () => {
      leaderboardWs.close();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen text-white bg-black bg-opacity-50">
      <h2 className="text-5xl mb-1 border-b-slate-500 border-solid border-b-2 py-4">Leaderboard</h2>
      {leaderboardElements}
    </div>
  );
}

export default LeaderboardWidget;
