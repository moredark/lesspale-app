import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserAuth, UserInfo } from "../../models/twitch.models";

export const twitchApi = createApi({
  reducerPath: "twitch/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://id.twitch.tv/",
  }),
  endpoints: (build) => ({
    getSecretData: build.query<UserAuth, string | null>({
      query: (authCode: string) => ({
        url: "/oauth2/token",
        method: "POST",
        params: {
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          code: authCode,
          grant_type: "authorization_code",
          redirect_uri: import.meta.env.VITE_REDIRECT_URL,
        },
      }),
    }),
    getUserInfo: build.query<UserInfo, string | null>({
      query: (access_token: string) => ({
        url: "oauth2/userinfo",
        headers: {
          ["Content-Type"]: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useGetSecretDataQuery, useLazyGetUserInfoQuery } = twitchApi;
