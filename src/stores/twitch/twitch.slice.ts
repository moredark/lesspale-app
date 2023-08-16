import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_AUTH_KEY = "TAK";

interface TwitchState {
  userAuth: string;
}

export interface userAuth {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
}

const initialState: TwitchState = {
  userAuth: JSON.parse(localStorage.getItem(LS_AUTH_KEY) ?? "{}"),
};

export const twitchSlice = createSlice({
  name: "twitch",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string>) {
      state.userAuth = action.payload;
      localStorage.setItem(LS_AUTH_KEY, JSON.stringify(state.userAuth ?? "{}"));
    },
  },
});

export const twitchActions = twitchSlice.actions;
export const twitchReducer = twitchSlice.reducer;
