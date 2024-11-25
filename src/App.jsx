import { useState } from "react";
import Header from "./components/Header";
import Countdown from "./components/Countdown";
import InputSelection from "./components/InputSelection";

export default function App() {
  const [groupSize, setGroupSize] = useState(5);
  const [maxStudents, setMaxStudents] = useState(2);
  const [timer, setTimer] = useState("15:00");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-6">
      {/* App Header */}

      <Header />
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-12">
        {/* Timer Section */}
        <Countdown timer={timer} />

        {/* Input Section */}

        <InputSelection />
        {/* Settings Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Size
            </label>
            <input
              type="number"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
            />
          </div>
          <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Students Per Group
            </label>
            <input
              type="number"
              value={maxStudents}
              onChange={(e) => setMaxStudents(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none"
            />
          </div>
          <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timer Duration (mm:ss)
            </label>
            <input
              type="time"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>
        </div>
        {/* Start Networking Button Section */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-12 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transform transition">
            Start Networking
          </button>
        </div>
        {/* Action Buttons Section */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-blue-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
            Download Log
          </button>
          <button className="bg-orange-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
            Clear Log
          </button>
          <button className="bg-red-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-500 transition">
            Show Log
          </button>
        </div>
      </div>
    </div>
  );
}
