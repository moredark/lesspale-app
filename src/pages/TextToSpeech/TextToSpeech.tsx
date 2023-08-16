import { useEffect, useState } from "react";
// import Input from "../../components/Input/Input";

function TextToSpeech() {
  const [volume, setVolume] = useState(0.5);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  let msg = new SpeechSynthesisUtterance();
  msg.volume = volume; // From 0 to 1
  msg.rate = rate; // From 0.1 to 10 speed
  msg.pitch = pitch; // From 0 to 2
  msg.lang = "ru";

  useEffect(() => {
    msg.volume = volume;
  }, [volume]);

  useEffect(() => {
    msg.rate = rate;
  }, [rate]);

  useEffect(() => {
    msg.pitch = pitch;
  }, [pitch]);

  const WS_URL = "ws://localhost:8080"; //адрес сервера WebSocket

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = function () {
      console.log("Соединение установлено");

      // Отправляем сообщение на сервер
      socket.send("Привет, сервер!");
    };

    socket.onmessage = function (event) {
      const response = JSON.parse(event.data);
      console.log(event.data);
      soundMessage(`${response.username.slice(1)} говорит ${response.message}`);
    };

    socket.onclose = function (event) {
      console.log("Соединение закрыто");
    };

    return () => {
      socket.close();
    };
  }, []);

  function soundMessage(message: string) {
    msg.text = message;
    speechSynthesis.speak(msg);
  }

  return (
    <div>
      TEXT TO SPEECH
      {/* <Input
        onChange={(e) => {
          setVolume(e.target.value);
        }}
        type="range"
        label="Volume"
        options={{ min: 0, max: 1, step: 0.1, value: volume }}
      />
      <Input
        onChange={(e) => {
          setRate(e.target.value);
        }}
        type="range"
        label="Rate"
        options={{ min: 0.1, max: 10, step: 0.1, value: rate }}
      />
      <Input
        onChange={(e) => {
          setPitch(e.target.value);
        }}
        type="range"
        label="Pitch"
        options={{ min: 0, max: 2, step: 0.1, value: pitch }}
      />

      <button
        onClick={() => {
          msg.text = "Проверка связи";
          speechSynthesis.speak(msg);
        }}
      >
        Test
      </button>
      <button
        onClick={() => {
          setVolume(0.5);
          setRate(1);
          setPitch(1);
        }}
      >
        Reset
      </button> */}
    </div>
  );
}

export default TextToSpeech;
