import { useState, useEffect } from "react";
import { apartmentInfo } from "../data/apartmentInfo";
import LanguageSwitch from "./LanguageSwitch";

export default function ChatSr() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("sr");
  const apartment = apartmentInfo[0];

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [lang]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const info = apartment.info[lang];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        apartmentInfo: info,
        lang,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
  };

  return (
    <div className="max-w-lg mt-5 mb-5 mx-auto bg-[#0D1B2A] rounded-2xl shadow-xl p-6">
      <LanguageSwitch lang={lang} setLang={setLang} />
      <h1 className="text-center text-3xl font-bold mb-4 mt-6 text-[#ffffff]">
        {lang === "sr" ? "AI Asistent Apartmana" : "AI Apartment Assistant"}
      </h1>

      <div className="relative h-100 overflow-y-auto p-4 border border-gray-300 rounded-lg bg-cover bg-center transition-all duration-500">
        {messages.length > 0 && (
          <div className="bg-white/60 rounded-lg p-2">
            {messages.map((m, i) => (
              <p
                key={i}
                className={`my-2 text-sm ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <b>
                  {m.role === "user"
                    ? lang === "sr"
                      ? "Gost:"
                      : "Guest:"
                    : lang === "sr"
                      ? "Asistent:"
                      : "Assistant:"}
                </b>{" "}
                {m.text}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            lang === "sr" ? "Kako vam mogu pomoći?" : "How can I help you?"
          }
          className="flex-grow rounded-lg p-2 bg-[#2c2d30] text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-[#2c2d30] text-white px-4 py-2 rounded-lg"
        >
          {lang === "sr" ? "Pošalji" : "Send"}
        </button>
      </div>
    </div>
  );
}
