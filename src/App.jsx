// require("dotenv").config();
import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import MoodForm from './components/MoodForm';
import Calendar from './components/Calendar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';


const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem('moodEntries')) || []);
  
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  // Fetch weather data once coordinates are available
  useEffect(() => {
    if (coords) {
      fetchWeatherData(coords.latitude, coords.longitude);
    }
  }, [coords]);

  const fetchWeatherData = async (latitude, longitude) => {
    const weatherAPIKey = process.env.REACT_APP_API_KEY; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data); // Update state with fetched weather data
      } else {
        console.error('Weather data fetch error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSave = (moodEntry) => {
    setEntries(prev => [...prev, moodEntry]);
  };

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const [backgroundColor, setBackgroundColor] = useState("bg-gray-800"); // Default background color

  
  return (
    <div className={`min-h-screen p-4 ${backgroundColor}`}>
      <h1 className="text-4xl font-semibold text-white text-center mb-8">🌤️ Mood Journal</h1>
      <div className="flex flex-col items-center">
        {!isGeolocationAvailable ? (
          <p className="text-red-500">Geolocation is not supported by your browser.</p>
        ) : !isGeolocationEnabled ? (
          <p className="text-red-500">Geolocation is disabled. Please enable it.</p>
        ) : coords ? (
          <>
            <WeatherDisplay weatherData={weatherData} />
            <MoodForm onSave={handleSave} setBackgroundColor={setBackgroundColor} />
          </>
        ) : (
          <p className="text-white">Fetching your location...</p>
        )}
        <Calendar entries={entries} />
      </div>
    </div>
  );
};

export default App;
