import { configureStore } from "@reduxjs/toolkit";
import { twitchApi } from "./twitch/twitch.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { twitchReducer } from "./twitch/twitch.slice";
import { backApi } from "./back/back.api";

export const store = configureStore({
  reducer: {
    [twitchApi.reducerPath]: twitchApi.reducer,
    [backApi.reducerPath]: backApi.reducer,
    twitch: twitchReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), twitchApi.middleware, backApi.middleware],
});

setupListeners(store.dispatch);

export type RootStore = ReturnType<typeof store.getState>;
