const Calendar = ({ entries }) => {
  return (
    <div className="mt-6 w-full max-w-2xl">
      <h2 className="text-2xl text-white mb-4">Mood Calendar</h2>
      <div className="grid grid-cols-1 gap-4">
        {entries.map((entry, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <span className="text-2xl">{entry.mood}</span>
              <p className="text-sm text-gray-400">{entry.date}</p>
            </div>
            <div className="text-white">{entry.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
