const WeatherDisplay = ({ weatherData }) => {
    if (!weatherData) return null;
  
    const { main, weather, name } = weatherData;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg mt-6">
        <h2 className="text-2xl text-white mb-4">Weather for {name}</h2>
        <div className="flex justify-between items-center">
          <img
            className="w-20 h-20"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
          <div className="text-white">
            <h3 className="text-3xl font-semibold">{temp}°C</h3>
            <p>{description}</p>
            <p>Humidity: {humidity}%</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherDisplay;
  