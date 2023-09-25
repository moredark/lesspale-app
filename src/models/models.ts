export interface TtsSettings {
  volume: number;
  pitch: number;
  rate: number;
  language: string;
  voice_status: number;
  command?: string;
  delay?: number;
  user: Channel;
}

interface Channel {
  username: string;
}

export interface LeaderboardResponse {
  count: number;
  results: LeaderboardMember[];
}

export interface LeaderboardRequest {
  channel: string;
  page?: number;
}

export interface LeaderboardMember {
  nickname: string;
  points: number;
}

export interface ServerSecret {
  secret: string;
}
