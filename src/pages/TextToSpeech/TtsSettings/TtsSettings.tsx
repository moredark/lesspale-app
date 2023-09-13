import { TtsSettings } from "../../../models/models";
import { supportedLanguages } from "../../../utils/supportedLanguages";

interface IProps {
  ttsSettings: TtsSettings;
  setTtsSettings: (ttsSettings: TtsSettings) => void;
}

export function TttSettings({ ttsSettings, setTtsSettings }: IProps) {
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTtsSettings({ ...ttsSettings, voice_status: Number(e.target.value) });
  };

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTtsSettings({ ...ttsSettings, command: e.target.value });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTtsSettings({ ...ttsSettings, volume: Number(e.target.value) });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTtsSettings({ ...ttsSettings, rate: Number(e.target.value) });
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTtsSettings({ ...ttsSettings, pitch: Number(e.target.value) });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTtsSettings({ ...ttsSettings, language: e.target.value });
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTtsSettings({ ...ttsSettings, delay: Number(e.target.value) });
  };

  return (
    <>
      <select
        value={ttsSettings.voice_status}
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleModeChange}
      >
        <option value="1">All</option>
        <option value="2">Off</option>
        <option value="3">Only with command word</option>
      </select>
      {ttsSettings.voice_status === 3 && (
        <>
          <label htmlFor="Command word">Command word</label>
          <input id="Command word" type="text" value={ttsSettings?.command} onChange={handleCommandChange} className="mainBg rounded p-2" />
        </>
      )}

      <label htmlFor="volume">Volume</label>
      <input id="volume" type="range" value={ttsSettings.volume} onChange={handleVolumeChange} min={0} max={1} step={0.1} />

      <label htmlFor="rate">Rate</label>
      <input id="rate" type="range" value={ttsSettings.rate} onChange={handleRateChange} min={0} max={2} step={0.1} />

      <label htmlFor="pitch">Pitch</label>
      <input id="pitch" type="range" value={ttsSettings.pitch} onChange={handlePitchChange} min={0} max={2} step={0.1} />

      <select
        value={ttsSettings.language}
        title="language"
        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleLanguageChange}
      >
        <option value="eng">Choose a language</option>
        {supportedLanguages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.title}
          </option>
        ))}
      </select>

      <label htmlFor="Delay">Delay</label>
      <input id="Delay" type="number" value={ttsSettings?.delay} onChange={handleDelayChange} className="mainBg rounded p-2" />
    </>
  );
}
