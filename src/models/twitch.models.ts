export interface UserAuth {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
}

export interface UserInfo {
  preferred_username: string;
  picture: string;
  updated_at: string;
  email: string;
}
