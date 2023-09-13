import { useEffect } from "react";
import { RootStore } from "../../stores";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSpeechSynthesisUtterance from "../../hooks/useSpeechSynthesis";
import { TttSettings } from "./TtsSettings/TtsSettings";
import { useAppSelector } from "../../hooks/redux";
import { useGetUserSettingsQuery, useUpdateUserSettingsMutation } from "../../stores/back/back.api";

function TextToSpeech() {
  const userName = useAppSelector((state: RootStore) => state.twitch.user.preferred_username);
  const { data: userSettings } = useGetUserSettingsQuery(userName);
  const [updateSettings] = useUpdateUserSettingsMutation();
  const applicationToken = useAppSelector((state: RootStore) => state.twitch.token);
  const { ttsSettings, setTtsSettings, soundMessage } = useSpeechSynthesisUtterance();

  useEffect(() => {
    if (userSettings) setTtsSettings(userSettings);
  }, [userSettings]);

  const twitchWs = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}twitch/?token=${applicationToken}`);
  useEffect(() => {
    if (applicationToken) {
      twitchWs.addEventListener("open", function () {
        console.log("Websocket connected");
        twitchWs.send(
          JSON.stringify({
            action: "join_room",
            request_id: new Date().getTime(),
          })
        );
      });

      twitchWs.addEventListener("message", function (event) {
        const response = JSON.parse(event.data);
        console.log(response);
        soundMessage(response);
        toast(response.name ? `${response.name}: ${response.message}` : `${response.message}`);
      });

      twitchWs.addEventListener("close", function () {
        console.log("Connection closed");
      });
    }
    return () => {
      twitchWs.close();
    };
  }, [ttsSettings.voice_status, ttsSettings.language, ttsSettings.delay]);

  const updateSettingsHandler = () => {
    updateSettings(ttsSettings)
      .then(() => {
        toast("Settings successfully saved", { theme: "light" });
      })
      .catch((e) => {
        toast(e.message, { theme: "colored" });
      });
  };

  const testButtonHandler = () => {
    const testMessage = { message: "I, Madara Uchiha, recognize you as my strongest opponent!" };
    soundMessage(testMessage);
    toast(testMessage.message);
  };

  return (
    <div className="w-[100%] h-screen mainBg">
      <div className="flex flex-col justify-center items-center mx-auto bg-slate-600 text-gray-200 container py-5 rounded">
        <h2 className="font-bold uppercase text-3xl">Spoken chat</h2>
        <div>
          <p className="text-[24px]"></p>
          <div className="flex flex-col gap-2 text-center mt-4 text-xl ">
            <TttSettings setTtsSettings={setTtsSettings} ttsSettings={ttsSettings} />
            <button onClick={testButtonHandler} className="mainBg rounded mt-4 hover:opacity-70 transition-opacity">
              Test
            </button>
            <button onClick={updateSettingsHandler} className="mainBg rounded mt-4 hover:opacity-70 transition-opacity">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
