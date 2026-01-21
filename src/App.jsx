import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[#2c2d30]">
      <div className="z-10 w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
