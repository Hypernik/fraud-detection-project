import React, { useState } from "react";
import axios from "axios";

const initialState = {
  "Unnamed: 0": "",
  trans_date_trans_time: "",
  cc_num: "",
  merchant: "",
  category: "",
  amt: "",
  first: "",
  last: "",
  gender: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  lat: "",
  long: "",
  city_pop: "",
  job: "",
  dob: "",
  trans_num: "",
  unix_time: "",
  merch_lat: "",
  merch_long: "",
  merch_zipcode: ""
};

const inputName = {
  "Unnamed: 0": "",
  trans_date_trans_time: "",
  cc_num: "Credit Card Number",
  merchant: "Merchant Name",
  category: "Category",
  amt: "Amount",
  first: "First Name",
  last: "Last Name",
  gender: "Gender",
  street: "Street",
  city: "City",
  state: "State",
  zip: "Zip Code",
  lat: "Latitude",
  long: "Longitude",
  city_pop: "City Population",
  job: "Job",
  dob: "Date of Birth",
  trans_num: "Transaction Number",
  unix_time: "Unix Time",
  merch_lat: "Merchent Latitude",
  merch_long: "Merchent Longitude",
  merch_zipcode: "Merchant Zip Code"
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
          // if key is not Unnamed: 0
          (key !== "Unnamed: 0") && (
            <div key={key} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>{inputName[key]}</label>
            <input
              type="text"
              name={inputName[key]}
              value={formData[key]}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          )
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
