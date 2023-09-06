import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/twitch.models";

const LS_KEY: string = "ACFA";
const USER_KEY: string = "UIK";

export interface AuthState {
  token: string | null;
  user: UserInfo;
}

const initialState: AuthState = {
  token: localStorage.getItem(LS_KEY),
  user: JSON.parse(localStorage.getItem(USER_KEY) ?? "{}"),
};

const twitchSlice = createSlice({
  name: LS_KEY,
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem(LS_KEY, state.token);
    },
    setUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
    },
  },
});

export const twitchActions = twitchSlice.actions;
export const twitchReducer = twitchSlice.reducer;
