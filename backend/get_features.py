import pickle
import numpy as np

with open("fraud_detection_model.pkl", "rb") as f:
    obj = pickle.load(f)

print("Type:", type(obj))
print("Shape:", np.shape(obj))
print("Sample:", obj)
