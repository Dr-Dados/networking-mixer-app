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
import NetworkingControls from "./components/NetworkingControls";
import GroupsDisplay from "./components/GroupsDisplay";

export default function App() {
  const [groupSize, setGroupSize] = useState(5);
  const [maxStudents, setMaxStudents] = useState(2);
  const [timer, setTimer] = useState("10:00");
  const [constantTimer, setConstantTimer] = useState("10:00");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  console.log(constantTimer, timer);

  const clearLogs = () => {
    setGroups([]);
    alert("Logs cleared successfully");
  };

  const showLogsHandler = () => {
    setShowLogs(!showLogs);
  };
  const generateGroups = () => {
    if (typeof groupSize !== "number" || groupSize <= 0) {
      console.error("Invalid group size:", groupSize);
      return;
    }

    const prosArray = generateArrayWithRole(professionals, "professional");
    const studentsArray = generateArrayWithRole(students, "student");

    const allParticipants = shuffleArray([...prosArray, ...studentsArray]);

    if (allParticipants.length === 0) {
      console.error("No participants available for grouping");
      return;
    }

    console.log("allParticipants", allParticipants);
    console.log("groupSize", groupSize);

    const dividedGroups = divideArray(allParticipants, groupSize);
    const newGroups = dividedGroups.map((group, index) => {
      const groupData = {
        id: "Group" + (index + 1),
        members: group,
        time: new Date().toLocaleTimeString(),
      };
      return groupData;
    });
    setNewGroups(newGroups);
    setGroups((prevGroups) => [...prevGroups, ...newGroups]);
  };

  const handleStartNetworking = () => {
    setIsTimerRunning(false); // Stop any existing timer
    generateGroups(); // Generate new groups
    setIsTimerRunning(true); // Start the timer
  };

  const handleStopNetworking = () => {
    setIsTimerRunning(false);
    setTimer(constantTimer);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-6">
      {/* App Header */}

      <Header />
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-12">
        {/* Timer Section */}
        <Countdown
          isTimerRunning={isTimerRunning}
          initialTimer={timer}
          constantTimer={constantTimer}
        />
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
          setConstantTimer={setConstantTimer}
        />
        {/* Start Networking Button Section */}
        <div className="mt-12 text-center">
          <NetworkingControls
            isTimerRunning={isTimerRunning}
            handleStartNetworking={handleStartNetworking}
            handleShuffleGroups={generateGroups}
            handleStopNetworking={handleStopNetworking}
          />
        </div>

        {/* Groups Display Section */}
        {groups.length > 0 ? <GroupsDisplay groups={newGroups} /> : null}

        {/* Action Buttons Section */}
        <LogsControls
          clearLogs={clearLogs}
          showLogsHandler={showLogsHandler}
          showLogs={showLogs}
        />
        {/* Show log section */}
        {showLogs && <Log logEntries={groups} />}
      </div>
    </div>
  );
}
