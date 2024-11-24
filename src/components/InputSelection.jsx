
const InputSection = ({ setProfessionals, setStudents }) => (
  <div className="flex justify-around mt-10 mb-10">
    <textarea
      className="border p-2 rounded-lg w-1/3 mr-2"
      rows={4}
      placeholder="Enter professionals..."
      onChange={(e) =>
        setProfessionals(
          e.target.value.split("\n").filter((name) => name.trim())
        )
      }
    />
    <textarea
      className="border p-2 rounded-lg w-1/3 ml-2"
      placeholder="Enter students..."
      onChange={(e) =>
        setStudents(e.target.value.split("\n").filter((name) => name.trim()))
      }
    />
  </div>
);

export default InputSection;
