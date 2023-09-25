import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserAuth } from "../../models/twitch.models";
import { RootStore } from "..";
import { LeaderboardRequest, LeaderboardResponse, ServerSecret, TtsSettings } from "../../models/models";

const API_ENDPOINTS = {
  CONNECT_TO_APP: "auth/convert-token",
  GET_USER_SETTINGS: (userName: string) => `api/settings/${userName}/`,
  UPDATE_USER_SETTINGS: (userName: string) => `api/settings/${userName}/`,
  GET_USER_LEADERBOARD: "api/leaderboard/",
  GET_LEADERBOARD_SECRET: (userName: string) => `api/leaderboard/secret/${userName}/`,
};

export const backApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootStore).twitch.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),

  endpoints: (build) => ({
    connectToApp: build.mutation<UserAuth, string | undefined>({
      query: (accessToken) => ({
        url: API_ENDPOINTS.CONNECT_TO_APP,
        method: "POST",
        body: {
          client_id: import.meta.env.VITE_CLIENT_ID_BACKEND,
          client_secret: import.meta.env.VITE_CLIENT_SECRET_BACKEND,
          grant_type: "convert_token",
          backend: "twitch",
          token: accessToken,
        },
      }),
    }),

    getUserSettings: build.query<TtsSettings, string>({
      query: (userName) => ({
        url: API_ENDPOINTS.GET_USER_SETTINGS(userName),
      }),
    }),

    updateUserSettings: build.mutation<TtsSettings, TtsSettings>({
      query: (args) => ({
        url: API_ENDPOINTS.UPDATE_USER_SETTINGS(args.user.username),
        method: "PATCH",
        body: args,
      }),
    }),

    getUserLeaderboard: build.query<LeaderboardResponse, LeaderboardRequest>({
      query: ({ channel, page = 1 }) => ({
        url: API_ENDPOINTS.GET_USER_LEADERBOARD,
        params: {
          channel,
          page,
        },
      }),
    }),

    getLeaderboardSecret: build.query<ServerSecret, string>({
      query: (userName) => ({
        url: API_ENDPOINTS.GET_LEADERBOARD_SECRET(userName),
      }),
    }),
  }),
});

export const {
  useConnectToAppMutation,
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
  useGetUserLeaderboardQuery,
  useGetLeaderboardSecretQuery,
} = backApi;
