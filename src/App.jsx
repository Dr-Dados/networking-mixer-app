import { useState } from "react";
import Header from "./components/Header";
import Countdown from "./components/Countdown";
import InputSelection from "./components/InputSelection";
import Controls from "./components/Controls";
import { generateArrayWithRole, shuffleArray } from "./helpers/helpers";
import Log from "./components/Log";
import LogsControls from "./components/LogsControls";
import NetworkingControls from "./components/NetworkingControls";
import GroupsDisplay from "./components/GroupsDisplay";
import Signature from "./components/Signature";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
  const [resetTimerFlag, setResetTimerFlag] = useState(false);

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
    if (typeof maxStudents !== "number" || maxStudents <= 0) {
      console.error("Invalid max students per group:", maxStudents);
      return;
    }

    const prosArray = generateArrayWithRole(professionals, "professional");
    const studentsArray = generateArrayWithRole(students, "student");

    const allParticipants = shuffleArray([...prosArray, ...studentsArray]);

    if (allParticipants.length === 0) {
      console.error("No participants available for grouping");
      return;
    }

    const dividedGroups = [];
    let currentGroup = [];
    let studentCount = 0;

    for (const participant of allParticipants) {
      // Check if adding the participant exceeds group constraints
      if (
        currentGroup.length < groupSize &&
        (participant.role !== "student" || studentCount < maxStudents)
      ) {
        currentGroup.push(participant);
        if (participant.role === "student") {
          studentCount++;
        }
      } else {
        // Save the current group and reset counters
        dividedGroups.push(currentGroup);
        currentGroup = [participant];
        studentCount = participant.role === "student" ? 1 : 0;
      }
    }

    // Add the last group if it's not empty
    if (currentGroup.length > 0) {
      dividedGroups.push(currentGroup);
    }

    const newGroups = dividedGroups.map((group, index) => ({
      id: "Group " + (index + 1),
      members: group,
      time: new Date().toLocaleTimeString(),
    }));

    setNewGroups(newGroups);
    setGroups((prevGroups) => [...prevGroups, ...newGroups]);
  };

  const handleStartNetworking = () => {
    setIsTimerRunning(false); // Stop any existing timer
    generateGroups(); // Generate new groups
    setIsTimerRunning(true); // Start the timer
  };

  const handleShuffleGroups = () => {
    generateGroups(); // Shuffle the groups
    setResetTimerFlag((prev) => !prev); // Toggle resetTimerFlag to trigger a timer reset
  };

  const handleStopNetworking = () => {
    setIsTimerRunning(false);
    setResetTimerFlag((prev) => !prev); // Toggle resetTimerFlag to trigger a timer reset
  };
  return (
    <>
      <SpeedInsights />

      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500">
        {/* App Header */}

        <Header />
        {/* Main Card */}
        <div className="w-full max-w-4xl p-8 space-y-12 bg-white shadow-2xl rounded-2xl">
          {/* Timer Section */}
          <Countdown
            isTimerRunning={isTimerRunning}
            initialTimer={timer}
            constantTimer={constantTimer}
            resetTimer={resetTimerFlag}
          />
          {/* Input Section */}

          <InputSelection
            setProfessionals={setProfessionals}
            setStudents={setStudents}
          />
          {/* Settings Section */}
          <Controls
            maxStudentsPerGroup={maxStudents}
            setMaxStudentsPerGroup={setMaxStudents}
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
              handleShuffleGroups={handleShuffleGroups}
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
          {showLogs && <Log logEntries={groups} timer={constantTimer} />}
          <Signature />
        </div>
      </div>
    </>
  );
}
