export interface ITtsSettings {
  volume: number;
  pitch: number;
  rate: number;
  language: string;
  voice_status: number;
  command?: string;
  delay?: number;
  user: {
    username: string;
  };
}
