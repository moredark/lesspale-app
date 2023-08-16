import { Link } from "react-router-dom";
import { useGetUserInfoQuery } from "../../stores/twitch/twitch.api";

export default function NavBar() {
  const { data } = useGetUserInfoQuery(JSON.parse(localStorage.getItem("TAK")).access_token);
  console.log(data);
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center">
        <h1 className="text-white text-xl font-bold">Lesspale</h1>
      </div>
      <div className="flex items-center">
        {/* <img className="w-8 h-8 rounded-full" src="https://www.behance.net/gallery/47035405/Free-avatars-flat-icons" alt="Аватар пользователя" /> */}
        <svg className="w-8 h-8 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="Avatar">
          <g data-name="Layer 2" fill="#000000" class="color000000 svgShape">
            <g data-name="—ÎÓÈ 1" fill="#000000" class="color000000 svgShape">
              <circle cx="30.9" cy="30.9" r="30.9" fill="#fbbc05" class="colorffc200 svgShape"></circle>
              <path
                fill="#34a853"
                fill-rule="evenodd"
                d="M52.587 52.908a30.895 30.895 0 0 1-43.667-.291 9.206 9.206 0 0 1 4.037-4.832 19.799 19.799 0 0 1 4.075-2.322c-2.198-7.553 3.777-11.266 6.063-12.335 0 3.487 3.265 1.173 7.317 1.217 3.336.037 9.933 3.395 9.933-1.035 3.67 1.086 7.67 8.08 4.917 12.377a17.604 17.604 0 0 1 3.181 2.002 10.192 10.192 0 0 1 4.144 5.22z"
                class="color677079 svgShape"
              ></path>
              <path
                fill="#f9e3a4"
                fill-rule="evenodd"
                d="m24.032 38.68 14.92.09v3.437l-.007.053a2.784 2.784 0 0 1-.07.462l-.05.341-.03.071c-.966 5.074-5.193 7.035-7.803 8.401-2.75-1.498-6.638-4.197-6.947-8.972l-.013-.059v-.2a8.897 8.897 0 0 1-.004-.207c0 .036.003.07.004.106z"
                class="colorf9dca4 svgShape"
              ></path>
              <path
                fill-rule="evenodd"
                d="M38.953 38.617v4.005a7.167 7.167 0 0 1-.095 1.108 6.01 6.01 0 0 1-.38 1.321c-5.184 3.915-13.444.704-14.763-5.983z"
                opacity=".11"
                fill="#000000"
                class="color000000 svgShape"
              ></path>
              <path
                fill="#f9e3a4"
                fill-rule="evenodd"
                d="M18.104 25.235c-4.94 1.27-.74 7.29 2.367 7.264a19.805 19.805 0 0 1-2.367-7.264zM43.837 25.235c4.94 1.27.74 7.29-2.368 7.263a19.8 19.8 0 0 0 2.368-7.263z"
                class="colorf9dca4 svgShape"
              ></path>
              <path
                fill="#ffeebe"
                fill-rule="evenodd"
                d="M30.733 11.361c20.523 0 12.525 32.446 0 32.446-11.83 0-20.523-32.446 0-32.446z"
                class="colorffe8be svgShape"
              ></path>
              <path
                fill="#ea4335"
                fill-rule="evenodd"
                d="M21.047 22.105a1.738 1.738 0 0 1-.414 2.676c-1.45 1.193-1.503 5.353-1.503 5.353-.56-.556-.547-3.534-1.761-5.255s-2.032-13.763 4.757-18.142a4.266 4.266 0 0 0-.933 3.6s4.716-6.763 12.54-6.568a5.029 5.029 0 0 0-2.487 3.26s6.84-2.822 12.54.535a13.576 13.576 0 0 0-4.145 1.947c2.768.076 5.443.59 7.46 2.384a3.412 3.412 0 0 0-2.176 4.38c.856 3.503.936 6.762.107 8.514-.829 1.752-1.22.621-1.739 4.295a1.609 1.609 0 0 1-.77 1.214c-.02.266.382-3.756-.655-4.827-1.036-1.07-.385-2.385.029-3.163 2.89-5.427-5.765-7.886-10.496-7.88-4.103.005-14 1.87-10.354 7.677z"
                class="color8a5c42 svgShape"
              ></path>
              <path
                fill="#435548"
                fill-rule="evenodd"
                d="M19.79 49.162c.03.038 10.418 13.483 22.63-.2-1.475 4.052-7.837 7.27-11.476 7.26-6.95-.02-10.796-5.6-11.154-7.06z"
                class="color434955 svgShape"
              ></path>
              <path
                fill="#4285f4"
                fill-rule="evenodd"
                d="M36.336 61.323c-.41.072-.822.135-1.237.192v-8.937a.576.576 0 0 1 .618-.516.576.576 0 0 1 .619.516v8.745zm-9.82.166q-.622-.089-1.237-.2v-8.711a.576.576 0 0 1 .618-.516.576.576 0 0 1 .62.516z"
                class="colore6e6e6 svgShape"
              ></path>
            </g>
          </g>
        </svg>

        <span className="text-white ml-2">{data?.preferred_username}</span>
      </div>
    </nav>
  );
}
