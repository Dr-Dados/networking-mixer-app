import { useState } from "react";
import toast from "react-hot-toast";

const Textarea = ({
  label,
  placeHolder,
  onClickHandler,
  buttonText,
  isActive,
}) => {
  const [textValue, setTextValue] = useState("");

  const handleChange = (e) => {
    setTextValue(e.target.value); // Update the state when the textarea value changes
  };

  const handleClick = () => {
    if (textValue.length === 0) {
      toast.error("Please enter a valid name");
      return;
    } // Pass
    toast.success(`${buttonText} successfully!`);
    onClickHandler(textValue.split("\n").filter((name) => name.trim()));
  };

  return (
    <div className="p-6 transition shadow-md bg-gray-50 rounded-xl hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">{label}</h2>
      <textarea
        placeholder={placeHolder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300 focus:outline-none"
        onChange={handleChange}
        disabled={isActive}
      ></textarea>
      <button
        className="w-full px-4 py-2 mt-4 text-white transition bg-purple-500 rounded-lg shadow-md hover:bg-purple-600"
        onClick={handleClick}
        disabled={isActive}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Textarea;
