import joblib

def load_model():
    model = joblib.load("decision_tree_best.pkl")
    return model