import React, { useEffect, useState } from 'react';
import axios from 'axios';

const thresholds = {
  temperature: 80,
  vibration: 20
};

export default function Dashboard() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState('Healthy');
  const [alert, setAlert] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sensor-data');
      setData(res.data);
      checkStatus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkStatus = (data) => {
    const temp = parseFloat(data.temperature);
    const vib = parseFloat(data.vibration);

    if (temp > thresholds.temperature && vib > thresholds.vibration) {
      setStatus('Critical');
      setAlert('ALERT: Temperature and Vibration too high');
    } else if (temp > thresholds.temperature || vib > thresholds.vibration) {
      setStatus('Warning');
      setAlert('ALERT: One parameter is too high');
    } else {
      setStatus('Healthy');
      setAlert('');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Sensor Data</h2>
      <ul>
        <li>Current: {data.current} A</li>
        <li>Voltage: {data.voltage} V</li>
        <li>Temperature: {data.temperature} °C</li>
        <li>Vibration: {data.vibration} mm/s</li>
      </ul>

      <h3>Status: {status}</h3>

      {alert && <p>{alert}</p>}
    </div>
  );
}
