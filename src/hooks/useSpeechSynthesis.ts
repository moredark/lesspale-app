import { useState, useEffect } from "react";
import { TtsSettings } from "../models/models";

export default function useSpeechSynthesisUtterance() {
  const [utterance] = useState(new SpeechSynthesisUtterance());
  const [ttsSettings, setTtsSettings] = useState<TtsSettings>({
    volume: 0.5,
    rate: 1,
    pitch: 1,
    language: "eng",
    voice_status: 2,
    delay: 5,
    command: "say",
    user: {
      username: "",
    },
  });

  utterance.volume = ttsSettings.volume; // From 0 to 1
  utterance.rate = ttsSettings.rate; // From 0.1 to 10
  utterance.pitch = ttsSettings.pitch; // From 0 to 2
  utterance.lang = ttsSettings.language;

  useEffect(() => {
    utterance.volume = ttsSettings.volume;
  }, [ttsSettings.volume]);

  useEffect(() => {
    utterance.rate = ttsSettings.rate;
  }, [ttsSettings.rate]);

  useEffect(() => {
    utterance.pitch = ttsSettings.pitch;
  }, [ttsSettings.pitch]);

  useEffect(() => {
    utterance.lang = ttsSettings.language;
  }, [ttsSettings.language]);

  function soundMessage(text: { name?: string; message: string }) {
    utterance.text = text.name ? `${text.name} ${text.message}` : `${text.message}`;
    speechSynthesis.speak(utterance);
  }

  return { ttsSettings, setTtsSettings, soundMessage };
}
