import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { twitchActions } from "../stores/twitch/twitch.slice";

const actions = {
  ...twitchActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
