import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserAuth } from "../../models/twitch.models";
import { RootStore } from "..";
import { ITtsSettings } from "../../models/models";

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
    connectToApp: build.mutation<UserAuth, string | null>({
      query: (accessToken: string) => ({
        url: "auth/convert-token",
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

    getUserSettings: build.query<ITtsSettings, string>({
      query: (userName) => ({
        url: `api/settings/${userName}/`,
      }),
    }),
    updateUserSettings: build.mutation<ITtsSettings, ITtsSettings>({
      query: (args) => ({
        url: `api/settings/${args.user.username}/`,
        method: "PATCH",
        body: args,
      }),
    }),
  }),
});

export const { useConnectToAppMutation, useGetUserSettingsQuery, useUpdateUserSettingsMutation } = backApi;
