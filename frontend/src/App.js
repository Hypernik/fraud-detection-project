import React, { useState } from "react";
import axios from "axios";

// Example categorical values based on training set
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
    trans_date_trans_time: now.toISOString(), // ISO string will be converted to UNIX in backend
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
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2>Fraud Detection Form</h2>
      <button onClick={handleRandomGenerate} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
        Generate Random Transaction
      </button>
      <form onSubmit={handleSubmit}>
        {Object.keys(generateRandomData()).map((field) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>{field}</label>
            <input
              type="text"
              value={formData[field] || ""}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "0.7rem 1.5rem" }}>
          Submit
        </button>
      </form>
      {prediction && (
        <div style={{ marginTop: "1.5rem", fontSize: "1.2rem", color: prediction.includes("Fraud") ? "red" : "green" }}>
          Prediction: {prediction}
        </div>
      )}
      {error && (
        <div style={{ marginTop: "1rem", color: "crimson" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
