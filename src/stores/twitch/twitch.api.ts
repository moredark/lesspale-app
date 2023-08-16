import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const twitchApi = createApi({
  reducerPath: "twitch/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://id.twitch.tv/",
  }),
  endpoints: (build) => ({
    getAuthorization: build.query<any, any>({
      query: (code: string) => ({
        url: "oauth2/token",
        method: "POST",
        params: {
          client_id: import.meta.env.VITE_CLIENT_ID, //FIX IT: insecureness
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: import.meta.env.VITE_REDIRECT_URL,
        },
      }),
    }),
    getUserInfo: build.query<any, any>({
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

export const { useLazyGetAuthorizationQuery, useGetUserInfoQuery } = twitchApi;
