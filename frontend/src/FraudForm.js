import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const defaultData = {
  trans_date_trans_time: '',
  cc_num: '',
  merchant: '',
  category: '',
  amt: '',
  first: '',
  last: '',
  gender: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  lat: '',
  long: '',
  city_pop: '',
  job: '',
  dob: '',
  trans_num: '',
  unix_time: '',
  merch_lat: '',
  merch_long: '',
  merch_zipcode: ''
};

const fieldNames = {
  trans_date_trans_time: 'Transaction Date and Time',
  cc_num: 'Credit Card Number',
  merchant: 'Merchant',
  category: 'Category',
  amt: 'Amount',
  first: 'First Name',
  last: 'Last Name',
  gender: 'Gender (M/F)',
  street: 'Street',
  city: 'City',
  state: 'State',
  zip: 'Zip Code',
  lat: 'Latitude',
  long: 'Longitue',
  city_pop: 'City Population',
  job: 'Job',
  dob: 'Date of Birth',
  trans_num: 'Transaction Number',
  unix_time: 'Timestamp',
  merch_lat: 'Merchant Latitude',
  merch_long: 'Merchant Longitude',
  merch_zipcode: 'Zip Code'
};

const sampleTransactionData = [
  // Fraudulent transactions
  {
    trans_date_trans_time: '2019-01-02 01:06:37',
    cc_num: '4613314721966',
    merchant: 'fraud_Rutherford-Mertz',
    category: 'grocery_pos',
    amt: 281.06,
    first: 'Jason',
    last: 'Murphy',
    gender: 'M',
    street: '542 Steve Curve Suite 011',
    city: 'Collettsville',
    state: 'NC',
    zip: 28611,
    lat: 35.9946,
    long: -81.7266,
    city_pop: 885,
    job: 'Soil scientist',
    dob: '1988-09-15',
    trans_num: 'e8a81877ae9a0a7f883e15cb39dc4022',
    unix_time: 1325466397,
    merch_lat: 36.430124,
    merch_long: -81.179483,
    merch_zipcode: 28644
  },
  {
    trans_date_trans_time: '2019-01-02 01:47:29',
    cc_num: '340187018810220',
    merchant: 'fraud_Jenkins, Hauck and Friesen',
    category: 'gas_transport',
    amt: 11.52,
    first: 'Misty',
    last: 'Hart',
    gender: 'F',
    street: '27954 Hall Mill Suite 575',
    city: 'San Antonio',
    state: 'TX',
    zip: 78208,
    lat: 29.44,
    long: -98.459,
    city_pop: 1595797,
    job: 'Horticultural consultant',
    dob: '1960-10-28',
    trans_num: 'bc7d41c41103877b03232f03f1f8d3f5',
    unix_time: 1325468849,
    merch_lat: 29.819364,
    merch_long: -99.142791,
    merch_zipcode: 78055
  },
  {
    trans_date_trans_time: '2019-01-02 03:05:23',
    cc_num: '340187018810220',
    merchant: 'fraud_Goodwin-Nitzsche',
    category: 'grocery_pos',
    amt: 276.31,
    first: 'Misty',
    last: 'Hart',
    gender: 'F',
    street: '27954 Hall Mill Suite 575',
    city: 'San Antonio',
    state: 'TX',
    zip: 78208,
    lat: 29.44,
    long: -98.459,
    city_pop: 1595797,
    job: 'Horticultural consultant',
    dob: '1960-10-28',
    trans_num: 'b98f12f4168391b2203238813df5aa8c',
    unix_time: 1325473523,
    merch_lat: 29.273085,
    merch_long: -98.83636,
    merch_zipcode: 78039
  },
  // Legitimate transactions
  {
    trans_date_trans_time: '2019-01-01 00:00:18',
    cc_num: '2703186189652095',
    merchant: 'fraud_Rippin, Kub and Mann',
    category: 'misc_net',
    amt: 4.97,
    first: 'Jennifer',
    last: 'Banks',
    gender: 'F',
    street: '561 Perry Cove',
    city: 'Moravian Falls',
    state: 'NC',
    zip: 28654,
    lat: 36.0788,
    long: -81.1781,
    city_pop: 3495,
    job: 'Psychologist, counselling',
    dob: '1988-03-09',
    trans_num: '0b242abb623afc578575680df30655b9',
    unix_time: 1325376018,
    merch_lat: 36.011293,
    merch_long: -82.048315,
    merch_zipcode: 28705
  },
  {
    trans_date_trans_time: '2019-01-01 00:00:44',
    cc_num: '630423337322',
    merchant: 'fraud_Heller, Gutmann and Zieme',
    category: 'grocery_pos',
    amt: 107.23,
    first: 'Stephanie',
    last: 'Gill',
    gender: 'F',
    street: '43039 Riley Greens Suite 393',
    city: 'Orient',
    state: 'WA',
    zip: 99160,
    lat: 48.8878,
    long: -118.2105,
    city_pop: 149,
    job: 'Special educational needs teacher',
    dob: '1978-06-21',
    trans_num: '1f76529f8574734946361c461b024d99',
    unix_time: 1325376044,
    merch_lat: 49.159047,
    merch_long: -118.186462,
    merch_zipcode: ''
  },
  {
    trans_date_trans_time: '2019-01-01 00:00:51',
    cc_num: '38859492057661',
    merchant: 'fraud_Lind-Buckridge',
    category: 'entertainment',
    amt: 220.11,
    first: 'Edward',
    last: 'Sanchez',
    gender: 'M',
    street: '594 White Dale Suite 530',
    city: 'Malad City',
    state: 'ID',
    zip: 83252,
    lat: 42.1808,
    long: -112.262,
    city_pop: 4154,
    job: 'Nature conservation officer',
    dob: '1962-01-19',
    trans_num: 'a1a22d70485983eac12b5b88dad1cf95',
    unix_time: 1325376051,
    merch_lat: 43.150704,
    merch_long: -112.154481,
    merch_zipcode: 83236
  }
];

const categories = ['misc_net', 'grocery_pos', 'entertainment', 'gas_transport', 'misc_pos'];
const merchants = ['fraud_Rippin, Kub and Mann', 'fraud_Keeling-Crist', 'fraud_Stroman, Hudson and Erdman'];
const genders = ['M', 'F'];
const states = ['CA', 'TX', 'NY', 'NC', 'FL'];

function FraudForm() {
  const [formData, setFormData] = useState(defaultData);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SampleData = () => {
    setFormData(sampleTransactionData[Math.floor(Math.random() * sampleTransactionData.length)]);
  };

  const randomizeData = () => {
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const now = new Date();
    const transTime = now.toISOString().replace('T', ' ').slice(0, 19);
    const randomUnix = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 100000);

    setFormData({
      trans_date_trans_time: transTime,
      cc_num: Math.floor(Math.random() * 1e15).toString(),
      merchant: randomItem(merchants),
      category: randomItem(categories),
      amt: (Math.random() * 500 + 5).toFixed(2),
      first: 'John',
      last: 'Doe',
      gender: randomItem(genders),
      street: `${Math.floor(Math.random() * 99999)} Random Street`,
      city: 'Sample City',
      state: randomItem(states),
      zip: Math.floor(Math.random() * 89999 + 10000),
      lat: (Math.random() * 10 + 30).toFixed(4),
      long: -(Math.random() * 60 + 60).toFixed(4),
      city_pop: Math.floor(Math.random() * 100000),
      job: 'Data Scientist',
      dob: '1980-01-01',
      trans_num: Math.random().toString(36).substring(2, 18),
      unix_time: randomUnix,
      merch_lat: (Math.random() * 10 + 30).toFixed(6),
      merch_long: -(Math.random() * 60 + 60).toFixed(6),
      merch_zipcode: Math.floor(Math.random() * 89999 + 10000)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(
        res.data.prediction === 1
          ? `⚠️ Fraudulent Transaction | Probability: ${(parseFloat(res.data.fraud_probability) * 100).toFixed(2)}%`
          : `✅ Legitimate Transaction | Fraud Probability: ${(parseFloat(res.data.fraud_probability) * 100).toFixed(2)}%`
      );
    } catch (err) {
      setPrediction(`Error: ${err.response?.data?.error || 'Something went wrong'}`);
    }
  };

  return (
    <div className="app-container">
      <h1>Credit Card Fraud Detection</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{fieldNames[key]}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <div className="buttons">
          <button type="button" onClick={randomizeData}>
            🎲 Use Random Generated Data
          </button>
          <button type="button" onClick={SampleData}>
            📦 Use Sample Data
          </button>
          <button type="submit">🔍 Predict</button>
        </div>
      </form>
      {prediction && <div className="prediction-result">{prediction}</div>}
    </div>
  );
}

export default FraudForm;
