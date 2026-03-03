import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "decision_tree_best.pkl")

model = joblib.load(model_path)