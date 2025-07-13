const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/sensor-data', (req, res) => {
  const data = {
    current: 45.5,
    voltage: 220.0,
    temperature: 75.0,
    vibration: 15.0
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
