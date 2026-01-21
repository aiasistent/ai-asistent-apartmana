import "country-flag-icons/react/3x2";
import { RS, GB } from "country-flag-icons/react/3x2";

export default function LanguageSwitch({ lang, setLang }) {
  return (
    <div className="flex justify-center gap-4 pt-6">
      <button
        onClick={() => setLang("sr")}
        className={`px-4 py-2 rounded ${
          lang === "sr" ? "bg-white text-black" : "bg-gray-700 text-white"
        }`}
      >
        SR <RS title="Serbia" className="w-8 h-6 ml-1" />
      </button>

      <button
        onClick={() => setLang("en")}
        className={`px-4 py-2 rounded ${
          lang === "en" ? "bg-white text-black" : "bg-gray-700 text-white"
        }`}
      >
        EN <GB title="United Kingdom" className="w-8 h-6 ml-1" />
      </button>
    </div>
  );
}
