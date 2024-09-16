import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;

