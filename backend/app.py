from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load your model (example: RandomForestClassifier)
with open("fraud_detection_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Make sure all expected features are provided
    expected_features = [
        'Unnamed: 0', 'trans_date_trans_time', 'cc_num', 'merchant', 'category',
        'amt', 'first', 'last', 'gender', 'street', 'city', 'state', 'zip', 'lat',
        'long', 'city_pop', 'job', 'dob', 'trans_num', 'unix_time', 'merch_lat',
        'merch_long', 'merch_zipcode'
    ]

    input_data = [data.get(feature, None) for feature in expected_features]

    if None in input_data:
        return jsonify({"error": "Missing one or more required fields"}), 400

    # Convert input to the shape expected by the model
    input_array = np.array([input_data])

    try:
        prediction = model.predict(input_array)
        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
