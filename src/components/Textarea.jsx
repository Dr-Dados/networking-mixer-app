import { useState } from "react";

const Textarea = ({ label, placeHolder, onClickHandler, buttonText }) => {
  const [textValue, setTextValue] = useState("");

  const handleChange = (e) => {
    setTextValue(e.target.value); // Update the state when the textarea value changes
  };

  const handleClick = () => {
    onClickHandler(textValue.split("\n").filter((name) => name.trim())); // Pass the current textarea value to the handler
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {label}
      </h2>
      <textarea
        placeholder={placeHolder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300 focus:outline-none"
        onChange={handleChange}
      ></textarea>
      <button
        className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Textarea;
