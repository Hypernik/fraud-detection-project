from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load the RandomForestClassifier model
with open("fraud_detection_model.pkl", "rb") as f:
    model = pickle.load(f)

# Example: The feature order expected by the model
feature_names = [
    'Unnamed: 0', 'trans_date_trans_time', 'cc_num', 'merchant', 'category',
    'amt', 'first', 'last', 'gender', 'street', 'city', 'state', 'zip',
    'lat', 'long', 'city_pop', 'job', 'dob', 'trans_num', 'unix_time',
    'merch_lat', 'merch_long', 'merch_zipcode'
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()['features']

        print(data)

        # Extract and order input features as per training
        input_data = [data[feature] for feature in feature_names]

        # Convert to numpy array and reshape
        input_array = np.array(input_data).reshape(1, -1)

        # Make prediction
        prediction = model.predict(input_array)[0]
        print(data)
        return jsonify({"prediction": str(prediction)})

    except KeyError as e:
        return jsonify({"error": f"Missing input field: {e}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
