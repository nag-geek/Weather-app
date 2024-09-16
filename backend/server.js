require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  condition: String,
  timestamp: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);

app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`);
    const weatherData = {
      city: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text
    };

    await Weather.create(weatherData);

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

