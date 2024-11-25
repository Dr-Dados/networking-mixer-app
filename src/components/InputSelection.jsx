import Textarea from "./Textarea";

const InputSection = ({ setProfessionals, setStudents }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Textarea
        label={"Add Professionals"}
        placeHolder={"Enter Professionals names, one per line..."}
        buttonText={"Add Professionals"}
        onClickHandler={setProfessionals}
      />
      <Textarea
        label={"Add Students"}
        placeHolder={"Enter student names, one per line..."}
        buttonText={"Add to List"}
        onClickHandler={setStudents}
      />
    </div>
  </>
);

export default InputSection;
