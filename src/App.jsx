import { useState } from "react";
import Header from "./components/Header";
import Countdown from "./components/Countdown";
import InputSelection from "./components/InputSelection";
import Controls from "./components/Controls";
import {
  divideArray,
  generateArrayWithRole,
  shuffleArray,
} from "./helpers/helpers";
import Log from "./components/Log";
import LogsControls from "./components/LogsControls";

export default function App() {
  const [groupSize, setGroupSize] = useState(5);
  const [maxStudents, setMaxStudents] = useState(2);
  const [timer, setTimer] = useState("10:00");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);

  const clearLogs = () => {
    setGroups([]);
    alert("Logs cleared successfully");
  };
  const generateGroups = () => {
    if (typeof groupSize !== "number" || groupSize <= 0) {
      console.error("Invalid group size:", groupSize);
      return;
    }

    const shuffledPros = generateArrayWithRole(
      shuffleArray(professionals),
      "professional"
    );
    const shuffledStudents = generateArrayWithRole(
      shuffleArray(students),
      "student"
    );

    const allParticipants = [...shuffledPros, ...shuffledStudents];
    console.log("allParticipants", allParticipants);
    if (allParticipants.length === 0) {
      console.error("No participants available for grouping");
      return;
    }

    console.log("allParticipants", allParticipants);
    console.log("groupSize", groupSize);

    const dividedGroups = divideArray(allParticipants, groupSize);
    const groups = dividedGroups.map((group, index) => {
      const groupData = {
        id: "Group" + (index + 1),
        members: group,
        time: new Date().toLocaleTimeString(),
      };
      return groupData;
    });
    setGroups(groups);
  };

  const handleStartNetworking = () => {
    setIsTimerRunning(false); // Stop any existing timer
    generateGroups(); // Generate new groups
    setIsTimerRunning(true); // Start the timer
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-6">
      {/* App Header */}

      <Header />
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-12">
        {/* Timer Section */}
        <Countdown initialTimer="01:30" constantTimer="01:30" />

        {/* Input Section */}

        <InputSelection
          setProfessionals={setProfessionals}
          setStudents={setStudents}
        />
        {/* Settings Section */}
        <Controls
          maxStudentsPerGroup={maxStudents}
          setMaxStudents={setMaxStudents}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
          timerInput={timer}
          setTimerInput={setTimer}
        />
        {/* Start Networking Button Section */}
        <div className="mt-12 text-center">
          <button
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-12 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transform transition"
            onClick={handleStartNetworking}
          >
            Start Networking
          </button>
        </div>
        {/* Action Buttons Section */}
        <LogsControls clearLogs={clearLogs} />
        {/* Show log section */}
        {groups.length > 0 && <Log logEntries={groups} />}
      </div>
    </div>
  );
}
