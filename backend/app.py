import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import joblib
from sklearn.preprocessing import LabelEncoder
import traceback
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and encoders
model = joblib.load("fraud_detection_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")
feature_columns = joblib.load("feature_columns.pkl")
scaler = joblib.load("scaler.pkl")  # Load scaler used for 'amt'

def preprocess_input(data):
    try:
        df = pd.DataFrame([data])

        # Drop unused columns if any
        columns_to_drop = [col for col in df.columns if col not in feature_columns]
        df.drop(columns=columns_to_drop, inplace=True, errors='ignore')

        # Ensure all expected columns are present
        for col in feature_columns:
            if col not in df.columns:
                df[col] = np.nan

        # Convert to correct types if needed
        for col in label_encoders:
            if col in df.columns:
                le = label_encoders[col]
                # Handle unseen labels
                df[col] = df[col].map(lambda x: x if x in le.classes_ else 'unknown')
                if 'unknown' not in le.classes_:
                    le.classes_ = np.append(le.classes_, 'unknown')
                df[col] = le.transform(df[col])

        if 'amt' in df.columns:
            df['amt'] = scaler.transform(df[['amt']])

        df = df[feature_columns]  # Ensure correct column order

        return df

    except Exception as e:
        print("Preprocessing error:", e)
        traceback.print_exc()
        return None

@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.get_json()
        processed_data = preprocess_input(input_data)

        if processed_data is None:
            return jsonify({"error": "Error processing input data"}), 400

        prediction = model.predict(processed_data)[0]
        probability = model.predict_proba(processed_data)[0][1]  # Probability of fraud

        return jsonify({
            "prediction": int(prediction),
            "fraud_probability": round(float(probability), 4)
        })

    except Exception as e:
        print("Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
