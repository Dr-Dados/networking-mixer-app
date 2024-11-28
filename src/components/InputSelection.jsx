import Textarea from "./Textarea";

const InputSection = ({ setProfessionals, setStudents, isActive }) => (
  <>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Textarea
        label={"Add Professionals"}
        placeHolder={"Enter Professionals names, one per line..."}
        buttonText={"Add Professionals"}
        onClickHandler={setProfessionals}
        isActive={isActive}
      />
      <Textarea
        label={"Add Students"}
        placeHolder={"Enter student names, one per line..."}
        buttonText={"Add Students"}
        onClickHandler={setStudents}
        isActive={isActive}
      />
    </div>
  </>
);

export default InputSection;
