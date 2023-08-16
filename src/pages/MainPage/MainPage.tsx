import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";

export function MainPage() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center w-5 ml-auto mr-auto">
        <h2 className="font-bold">Menu</h2>
        <Link to="/textToSpeech">
          <p className="">TTS</p>
        </Link>
      </div>
    </div>
  );
}
