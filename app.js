const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sortKey: Math.random() })) // Create an array of objects with random sort keys
    .sort((a, b) => a.sortKey - b.sortKey) // Sort the objects by the random sort key
    .map((obj) => obj.value); // Extract t

const generateArrayWithRole = (names, role) => {
  if (!Array.isArray(names)) {
    throw new Error("First parameter must be an array of names");
  }
  if (role !== "student" && role !== "professional") {
    throw new Error(
      'Second parameter must be either "student" or "professional"'
    );
  }

  return names.map((name) => ({ name, role }));
};

const students = [
  "Youssef Moufid",
  "Iliasse Ilali",
  "Aya KIHAL",
  "Abdellah Berrada",
  "Elmaakoul Mohamed",
  "Yassine Lchgary",
  "El Maatouki Mohamed",
  "Hamza Bouragba",
  "Younes Bensalah",
  "BALOURI",
  "Belhaj Aiça Azzahid",
  "N'goran N'guessan Jonathan",
  "Kenza Lahlou",
  "Taha Banouny",
  "Younes Ziary",
  "Aya Alkantari",
];

const professionals = [
  "Adnane Bachchar",
  "Badr Bensassi",
  "Aafir Abderrahman",
  "Abdelkarim JAJA",
  "Taha Laghzali",
  "Amine Benkhouya",
  "Mazouza Mohammed",
  "Miyara Laila",
  "Nabil Makboul",
  "Bilal EL KOUCHE",
  "Mohamed-Anas EL HAMDANI",
  "Rachid Lghachi",
  "Nasihi Chaymaa",
  "Yasser Kh",
  "Zakaria Hatimi",
  "Rachid Dakki",
  "Houssam-Eddine Mney",
  "BILAL",
  "Yasser Senhaji Mounir",
  "El Khettar Amine",
  "Charifa OUHAGA",
  "Salah Saïd",
  "Fouzi Belhaj",
  "Yassine EL KAABA",
  "Imane Doukkar",
  "Hamza Bouragba",
  "Youssoufi Reda",
  "Younes Bensalah",
  "Rachid Othmane",
  "Salah Eddine Bentalba",
  "Abdelhamid Jabrane",
  "Samir Zemmama",
];

const generateGroups = (groupSize, maxStudents) => {
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

  while (studentsCopy.length > 0 || professionalsCopy.length > 0) {
    // Add students up to the max allowed in the group
    while (
      studentsCopy.length > 0 &&
      studentCount < maxStudents &&
      currentGroup.length < groupSize
    ) {
      const student = studentsCopy.shift();
      if (student) {
        currentGroup.push(student);
        studentCount++;
      }
    }
    console.log("studentsCopy", studentsCopy);
    // Add professionals to fill the remaining slots
    while (professionalsCopy.length > 0 && currentGroup.length < groupSize) {
      const professional = professionalsCopy.shift();
      if (professional) {
        currentGroup.push(professional);
      }
    }
    console.log("professionalsCopy", professionalsCopy);
    // Finalize the current group if it's full or no more members are available
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
    if (
      currentGroup.length === groupSize ||
      (studentsCopy.length === 0 && professionalsCopy.length === 0)
    ) {
      groups.push([...currentGroup]); // Use a copy of the array
      currentGroup = [];
      studentCount = 0; // Reset student count for the next group
    }
  }

  const newGroups = groups.map((group, index) => ({
    id: `Group ${index + 1}`,
    members: group,
    time: new Date().toLocaleTimeString(),
  }));

  console.log("Generated Groups:", newGroups);

  // Update state with the generated groups
  return newGroups;
};

console.log(generateGroups(8, 2));
