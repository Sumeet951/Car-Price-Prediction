from fastapi import APIRouter
import pandas as pd
from schemas import CarData
from model_loader import load_model

router = APIRouter()

model = load_model()

@router.post("/predict")
def predict_price(data: CarData):
    input_df = pd.DataFrame([data.dict()])
    prediction = model.predict(input_df)[0]

    return {
        "predicted_price": round(float(prediction), 2)
    }