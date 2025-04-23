import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const exampleValues = {
  merchant: ["merchant_1", "merchant_2", "merchant_3"],
  category: ["shopping", "food", "gas_transport", "entertainment"],
  gender: ["M", "F"],
  city: ["New York", "Los Angeles", "Chicago"],
  state: ["NY", "CA", "IL"],
  job: ["Engineer", "Doctor", "Artist"],
  street: ["123 Main St", "456 Elm St", "789 Oak Ave"],
  first: ["John", "Alice", "Bob"],
  last: ["Smith", "Johnson", "Lee"],
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomData = () => {
  const now = new Date();
  const dob = new Date(now.getFullYear() - (20 + Math.floor(Math.random() * 40)), Math.random() * 12, Math.random() * 28);

  return {
    trans_date_trans_time: now.toISOString(),
    merchant: getRandom(exampleValues.merchant),
    category: getRandom(exampleValues.category),
    amt: (Math.random() * 1000).toFixed(2),
    gender: getRandom(exampleValues.gender),
    city: getRandom(exampleValues.city),
    state: getRandom(exampleValues.state),
    job: getRandom(exampleValues.job),
    dob: dob.toISOString(),
    trans_num: Math.random().toString(36).substring(2, 10),
    unix_time: Math.floor(now.getTime() / 1000),
    merch_lat: (Math.random() * 90).toFixed(6),
    merch_long: (Math.random() * 180).toFixed(6),
    city_pop: Math.floor(Math.random() * 1000000),
    lat: (Math.random() * 90).toFixed(6),
    long: (Math.random() * 180).toFixed(6),
    zip: Math.floor(10000 + Math.random() * 89999),
    street: getRandom(exampleValues.street),
    first: getRandom(exampleValues.first),
    last: getRandom(exampleValues.last),
    ssn: `${Math.floor(Math.random() * 900000000) + 100000000}`,
    merchant_lat: (Math.random() * 90).toFixed(6),
    merchant_long: (Math.random() * 180).toFixed(6),
  };
};

const App = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleRandomGenerate = () => {
    const data = generateRandomData();
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      const result = response.data.prediction;
      setPrediction(result === 1 ? "Fraudulent Transaction" : "Legitimate Transaction");
    } catch (err) {
      setError("Prediction failed: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Credit Card Fraud Detection</h2>
      <button className="generate-button" onClick={handleRandomGenerate}>
        Generate Random Transaction
      </button>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(generateRandomData()).map((field) => (
          <div key={field} className="form-group">
            <label className="label">{field}</label>
            <input
              type="text"
              className="input"
              value={formData[field] || ""}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              required
            />
          </div>
        ))}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      {prediction && (
        <div className={`prediction ${prediction.includes("Fraud") ? "fraud" : "legit"}`}>
          Prediction: {prediction}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default App;