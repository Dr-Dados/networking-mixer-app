import React, { useState, useEffect } from "react";
import Controls from "./components/Controls";
import InputSection from "./components/InputSelection";
import Countdown from "./components/Countdown";
import Groups from "./components/Groups";
import Log from "./components/Log";
import Buttons from "./components/Buttons";

const App = () => {
  const [groupSize, setGroupSize] = useState(5);
  const [maxStudentsPerGroup, setMaxStudentsPerGroup] = useState(2);
  const [timerInput, setTimerInput] = useState("15:00");
  const [timerDuration, setTimerDuration] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [logEntries, setLogEntries] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLogVisible, setLogVisible] = useState(false);
  const [countdownInterval, setCountdownInterval] = useState(null);

  // Helper Functions
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const convertTimerToSeconds = (timer) => {
    const [minutes, seconds] = timer.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const createGroups = () => {
    const shuffledProfessionals = shuffleArray(professionals);
    const shuffledStudents = shuffleArray(students);

    const newGroups = [];
    let professionalIndex = 0;
    let studentIndex = 0;

    while (
      professionalIndex < shuffledProfessionals.length ||
      studentIndex < shuffledStudents.length
    ) {
      const group = [];

      for (
        let i = 0;
        i < maxStudentsPerGroup && studentIndex < shuffledStudents.length;
        i++
      ) {
        group.push({ name: shuffledStudents[studentIndex++], type: "student" });
      }

      while (
        group.length < groupSize &&
        professionalIndex < shuffledProfessionals.length
      ) {
        group.push({
          name: shuffledProfessionals[professionalIndex++],
          type: "professional",
        });
      }

      newGroups.push(group);
      logGroupChange(newGroups.length, group);
    }

    setGroups(newGroups);
    setTimeRemaining(timerDuration);
    startTimer();
  };

  const logGroupChange = (groupNumber, groupMembers) => {
    const currentTime = new Date().toLocaleTimeString();
    setLogEntries((prevLog) => [
      ...prevLog,
      {
        time: currentTime,
        groupNumber,
        members: groupMembers,
        timer: timerInput,
      },
    ]);
  };

  const startTimer = () => {
    clearInterval(countdownInterval);
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          alert("Time is up! Creating new groups...");
          createGroups();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setCountdownInterval(interval);
  };

  const downloadLog = () => {
    const csvContent =
      "Time,Group,Members,Change Groups Every\n" +
      logEntries
        .map(
          (entry) =>
            `${entry.time},Group ${entry.groupNumber},"${entry.members
              .map((member) => member.name)
              .join(", ")}",${entry.timer}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "group_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg text-center max-w-5xl">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Networking Group Mixer
        </h1>
        <InputSection
          setProfessionals={setProfessionals}
          setStudents={setStudents}
        />
        <Controls
          groupSize={groupSize}
          maxStudentsPerGroup={maxStudentsPerGroup}
          timerInput={timerInput}
          setGroupSize={setGroupSize}
          setMaxStudentsPerGroup={setMaxStudentsPerGroup}
          setTimerInput={setTimerInput}
        />

        <Countdown timeRemaining={timeRemaining} />

        <Groups groups={groups} />

        <Buttons
          createGroups={createGroups}
          downloadLog={downloadLog}
          clearLog={() => setLogEntries([])}
          toggleLog={() => setLogVisible((prev) => !prev)}
        />

        {isLogVisible && <Log logEntries={logEntries} />}
      </div>
    </div>
  );
};

export default App;
