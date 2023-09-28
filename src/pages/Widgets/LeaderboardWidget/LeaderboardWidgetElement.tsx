import { LeaderboardMember } from "../../../models/models";
import { numbersFormat } from "../../../utils/utils";

interface LeaderboardWidgetElementProps {
  elementProps: LeaderboardMember;
  index: number;
}

function LeaderboardWidgetElement({ elementProps, index }: LeaderboardWidgetElementProps) {
  let medal;
  switch (index) {
    case 0:
      medal = "🥇";
      break;
    case 1:
      medal = "🥈";
      break;
    case 2:
      medal = "🥉";
      break;
    default:
      medal = "🤓";
      break;
  }
  const { nickname, points } = elementProps;
  return (
    <div className="text-4xl flex justify-between max-w-[480px] my-2">
      <span className="text-green-500">
        {medal} {nickname}
      </span>
      <span> {numbersFormat(points)}</span>
    </div>
  );
}

export default LeaderboardWidgetElement;
