import React, { useState } from "react";
import axios from "axios";

// Replace with your actual initial state keys
const initialState = {
  "trans_date_trans_time": "",
  "cc_num": "",
  "merchant": "",
  "category": "",
  "amt": "",
  "first": "",
  "last": "",
  "gender": "",
  "street": "",
  "city": "",
  "state": "",
  "zip": "",
  "lat": "",
  "long": "",
  "city_pop": "",
  "job": "",
  "dob": "",
  "trans_num": "",
  "unix_time": "",
  "merch_lat": "",
  "merch_long": "",
  "merch_zipcode": ""
};

// Optional: Human-readable labels
const inputName = {
  "trans_date_trans_time": "Transaction Date and Time",
  "cc_num": "Credit Card Number",
  "merchant": "Merchant",
  "category": "Category",
  "amt": "Amount",
  "first": "First Name",
  "last": "Last Name",
  "gender": "Gender",
  "street": "Street",
  "city": "City",
  "state": "State",
  "zip": "Zip Code",
  "lat": "Latitude",
  "long": "Longitude",
  "city_pop": "City Population",
  "job": "Job",
  "dob": "Date of Birth",
  "trans_num": "Transaction Number",
  "unix_time": "Unix Time",
  "merch_lat": "Merchant Latitude",
  "merch_long": "Merchant Longitude",
  "merch_zipcode": "Merchant Zip Code"
};

function App() {
  const [formData, setFormData] = useState(initialState);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Error making prediction");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Fraud Detection Input Form</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              {inputName[key] || key}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
          Predict
        </button>
      </form>

      {prediction && (
        <div style={{ marginTop: "2rem", fontSize: "1.25rem" }}>
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
}

export default App;
