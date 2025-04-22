from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load model and preprocessing assets
model = joblib.load("fraud_detection_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")  # dict of LabelEncoders
feature_columns = joblib.load("feature_columns.pkl")  # list of feature names

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Construct DataFrame in expected order
        row = [data.get(col, None) for col in feature_columns]
        df = pd.DataFrame([row], columns=feature_columns)

        # Convert time fields to numeric if in ISO format
        for col in ['dob', 'trans_date_trans_time']:
            if col in df.columns and isinstance(df[col].iloc[0], str):
                try:
                    df[col] = pd.to_datetime(df[col]).astype(int) // 10**9  # UNIX timestamp
                except Exception:
                    df[col] = -1

        # Encode all object (string) columns using saved LabelEncoders
        for col in df.columns:
            if df[col].dtype == object:
                le = label_encoders.get(col)
                if le:
                    try:
                        df[col] = le.transform(df[col])
                    except ValueError:
                        # Handle unseen labels
                        df[col] = -1
                else:
                    # If no encoder was saved, drop or set default
                    df[col] = -1

        # Ensure all fields are numeric before prediction
        df = df.apply(pd.to_numeric, errors='coerce').fillna(-1)

        # Predict
        prediction = model.predict(df)[0]
        return jsonify({'prediction': int(prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
