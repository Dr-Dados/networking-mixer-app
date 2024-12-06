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
import { Analytics } from "@vercel/analytics/react";
import SuggestGroupPhrase from "./components/SuggestGroupPhrase";

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
    toast.success("Logs cleared successfully");
  };

  const generateGroups = () => {
    if (students.length === 0 || professionals.length === 0) {
      toast.error("Please add both students and professionals.");
      return;
    }

    const prosArray = shuffleArray(
      generateArrayWithRole(professionals, "professional")
    );
    const studentsArray = shuffleArray(
      generateArrayWithRole(students, "student")
    );
    const groups = [];
    let currentGroup = [];
    let studentCount = 0;

    const studentsCopy = [...studentsArray];
    const professionalsCopy = [...prosArray];

    console.log("Initial Students:", studentsCopy);
    console.log("Initial Professionals:", professionalsCopy);

    while (studentsCopy.length > 0 || professionalsCopy.length > 0) {
      // Add students up to the max allowed in the group
      while (
        studentsCopy.length > 0 &&
        studentCount < maxStudents &&
        currentGroup.length < groupSize
      ) {
        const student = studentsCopy.shift();
        console.log("student", student);
        if (student) {
          currentGroup.push(student);
          studentCount++;
        }
      }

      // Add professionals to fill the remaining slots
      while (professionalsCopy.length > 0 && currentGroup.length < groupSize) {
        const professional = professionalsCopy.shift();
        console.log("professional", professional);
        if (professional) {
          currentGroup.push(professional);
        }
      }

      // If no professionals are left but students remain, fill the group with students
      while (
        studentsCopy.length > 0 &&
        professionalsCopy.length === 0 &&
        currentGroup.length < groupSize
      ) {
        const student = studentsCopy.shift();
        if (student) {
          currentGroup.push(student);
          studentCount++;
        }
      }

      // Finalize the current group if it's full or no more members are available
      if (
        currentGroup.length === groupSize ||
        (studentsCopy.length === 0 && professionalsCopy.length === 0)
      ) {
        groups.push([...currentGroup]); // Use a copy of the array
        currentGroup = [];
        studentCount = 0; // Reset student count for the next group
      }
      console.log(groups, studentsCopy.length, professionalsCopy.length);
    }

    const newGroups = groups.map((group, index) => ({
      id: `Group ${index + 1}`,
      members: group,
      time: new Date().toLocaleTimeString(),
    }));

    console.log("Generated Groups:", newGroups);

    // Update state with the generated groups
    setNewGroups(newGroups);
    setGroups((prevGroups) => [...prevGroups, ...newGroups]);
  };

  const handleStartNetworking = () => {
    toast.success("Networking started successfully");
    setIsTimerRunning(false);
    generateGroups();
    setIsTimerRunning(true);
  };

  const handleShuffleGroups = () => {
    toast.success("Groups shuffled successfully");
    generateGroups();
    setResetTimerFlag((prev) => !prev);
    setTimer(constantTimer);
  };

  const handleStopNetworking = () => {
    setIsTimerRunning(false);
    setResetTimerFlag((prev) => !prev);
    toast.success("Networking stopped successfully");
  };

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Toaster />

      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500">
        <Header />
        <div className="w-full max-w-4xl p-8 space-y-12 bg-white shadow-2xl rounded-2xl">
          <Countdown
            isTimerRunning={isTimerRunning}
            initialTimer={timer}
            constantTimer={constantTimer}
            resetTimer={resetTimerFlag}
          />
          <InputSelection
            setProfessionals={setProfessionals}
            setStudents={setStudents}
            isActive={isTimerRunning}
          />

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
          <div className="mt-12 text-center">
            <NetworkingControls
              isTimerRunning={isTimerRunning}
              handleStartNetworking={handleStartNetworking}
              handleShuffleGroups={handleShuffleGroups}
              handleStopNetworking={handleStopNetworking}
            />
          </div>
          {groups.length > 0 ? <GroupsDisplay groups={newGroups} /> : null}
          <LogsControls
            clearLogs={clearLogs}
            showLogsHandler={() => setShowLogs(!showLogs)}
            showLogs={showLogs}
          />
          {showLogs && <Log logEntries={groups} timer={constantTimer} />}
          <Signature />
        </div>
      </div>
    </>
  );
}
