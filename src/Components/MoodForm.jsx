import { useState, useEffect } from "react";

const MoodForm = ({ onSave, setBackgroundColor }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  // Define mood to background color mapping
  const moodColors = {
    "😊": "bg-yellow-300", // Happy
    "😢": "bg-blue-300",   // Sad
    "😎": "bg-green-400",  // Cool
    "😡": "bg-red-400",    // Angry
    "😴": "bg-gray-500",   // Sleepy
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setBackgroundColor(moodColors[mood]);  // Update the background color based on selected mood
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood && note) {
      const moodEntry = {
        mood: selectedMood,
        note,
        date: new Date().toLocaleDateString(),
      };
      onSave(moodEntry);
      setSelectedMood(null);
      setNote("");
    } else {
      alert("Please select a mood and add a note.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-lg mt-6">
      <h2 className="text-2xl text-white mb-4">Select Your Mood</h2>
      <div className="flex justify-around mb-4">
        <span
          onClick={() => handleMoodClick("😊")}
          className={`text-4xl cursor-pointer transition-transform duration-300 hover:scale-110 ${
            selectedMood === "😊" ? "border-4 border-blue-500" : ""
          }`}
        >
          😊
        </span>
        <span
          onClick={() => handleMoodClick("😢")}
          className={`text-4xl cursor-pointer transition-transform duration-300 hover:scale-110 ${
            selectedMood === "😢" ? "border-4 border-blue-500" : ""
          }`}
        >
          😢
        </span>
        <span
          onClick={() => handleMoodClick("😎")}
          className={`text-4xl cursor-pointer transition-transform duration-300 hover:scale-110 ${
            selectedMood === "😎" ? "border-4 border-blue-500" : ""
          }`}
        >
          😎
        </span>
        <span
          onClick={() => handleMoodClick("😡")}
          className={`text-4xl cursor-pointer transition-transform duration-300 hover:scale-110 ${
            selectedMood === "😡" ? "border-4 border-blue-500" : ""
          }`}
        >
          😡
        </span>
        <span
          onClick={() => handleMoodClick("😴")}
          className={`text-4xl cursor-pointer transition-transform duration-300 hover:scale-110 ${
            selectedMood === "😴" ? "border-4 border-blue-500" : ""
          }`}
        >
          😴
        </span>
      </div>

      <div className="mb-4">
        <label htmlFor="note" className="text-white">Your Notes:</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
          rows="4"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Save Mood Entry
      </button>
    </form>
  );
};

export default MoodForm;
