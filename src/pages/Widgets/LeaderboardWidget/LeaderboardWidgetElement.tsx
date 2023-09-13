interface LeaderboardWidgetElementProps {
  elementProps: {
    nickname: string;
    experience: number;
    level: number;
  };
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
  const { nickname, experience } = elementProps;
  return (
    <div className="text-4xl flex justify-between max-w-[380px] my-2">
      <span className="text-green-500">
        {medal} {nickname}
      </span>
      <span> {experience} exp</span>
    </div>
  );
}

export default LeaderboardWidgetElement;
