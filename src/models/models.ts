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
  channel: Channel;
  leaderboard_members: LeaderboardMember[];
}

export interface LeaderboardMember {
  nickname: string;
  experience: number;
  level: number;
}
