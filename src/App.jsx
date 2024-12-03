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
import toast, { Toaster } from "react-hot-toast";

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

    const groups = [];
    let currentGroup = [];
    let studentCount = 0;

    const studentsCopy = [...studentsArray];
    const professionalsCopy = [...prosArray];

    // Loop until both arrays are empty
    while (studentsCopy.length > 0 || professionalsCopy.length > 0) {
      // Add students to the group up to maxStudents
      while (
        studentsCopy.length > 0 &&
        studentCount < maxStudents &&
        currentGroup.length < groupSize
      ) {
        currentGroup.push(studentsCopy.shift()); // Remove the first student and add to group
        studentCount++;
      }

      // Add professionals to fill the group
      while (professionalsCopy.length > 0 && currentGroup.length < groupSize) {
        currentGroup.push(professionalsCopy.shift()); // Remove the first professional and add to group
      }

      // If the group is full, finalize it
      if (
        currentGroup.length === groupSize ||
        (studentsCopy.length === 0 && professionalsCopy.length === 0)
      ) {
        groups.push(shuffleArray(currentGroup));
        currentGroup = [];
        studentCount = 0; // Reset student count for the next group
      }
    }
    // // Map groups to the desired structure
    const newGroups = groups.map((group, index) => ({
      id: `Group ${index + 1}`,
      members: group,
      time: new Date().toLocaleTimeString(),
    }));
    // // Update the state with the generated groups
    console.log(newGroups);
    setNewGroups(newGroups);
    setGroups((prevGroups) => [...prevGroups, ...newGroups]);
    // // Process participants to form groups
    // while (prosArray.length > 0 || studentsArray.length > 0) {
    //   // Add students up to maxStudents
    //   addParticipantsToGroup(studentsArray, "student", maxStudents);
    //   // Fill remaining slots with professionals
    //   addParticipantsToGroup(prosArray, "professional");

    //   // If the group is full, finalize it
    //   if (currentGroup.length === groupSize) {
    //     dividedGroups.push(currentGroup);
    //     currentGroup = [];
    //     studentCount = 0; // Reset student count for the next group
    //   }
    // }

    // // Add any remaining participants to a group (even if constraints are not satisfied)
    // if (currentGroup.length > 0) {
    //   dividedGroups.push(shuffleArray(currentGroup));
    // }

    // // Map groups to the desired structure
    // const newGroups = dividedGroups.map((group, index) => ({
    //   id: `Group ${index + 1}`,
    //   members: group,
    //   time: new Date().toLocaleTimeString(),
    // }));
  };

  const handleStartNetworking = () => {
    toast.success("Networking started successfully");
    setIsTimerRunning(false); // Stop any existing timer
    generateGroups(); // Generate new groups
    setIsTimerRunning(true); // Start the timer
  };

  const handleShuffleGroups = () => {
    toast.success("Groups shuffled successfully");
    generateGroups(); // Shuffle the groups
    setResetTimerFlag((prev) => !prev); // Toggle resetTimerFlag to trigger a timer reset
  };

  const handleStopNetworking = () => {
    setIsTimerRunning(false);
    setResetTimerFlag((prev) => !prev); // Toggle resetTimerFlag to trigger a timer reset
    toast.success("Networking stopped successfully");
  };
  return (
    <>
      <SpeedInsights />
      <Toaster />

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
            isActive={isTimerRunning}
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
            isActive={isTimerRunning}
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
