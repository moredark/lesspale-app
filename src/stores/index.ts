import { configureStore } from "@reduxjs/toolkit";
import { twitchApi } from "./twitch/twitch.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { twitchReducer } from "./twitch/twitch.slice";
export const store = configureStore({
  reducer: {
    [twitchApi.reducerPath]: twitchApi.reducer,
    twitch: twitchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(twitchApi.middleware),
});

setupListeners(store.dispatch);

export type RootStore = ReturnType<typeof store.getState>;
