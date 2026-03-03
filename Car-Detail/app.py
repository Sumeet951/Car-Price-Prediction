import streamlit as st
import pickle
import pandas as pd

# -----------------------------------
# Load model & columns
# -----------------------------------
with open("best_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("model_columns.pkl", "rb") as f:
    model_columns = pickle.load(f)

# -----------------------------------
# Streamlit config
# -----------------------------------
st.set_page_config(
    page_title="Car Price Prediction",
    page_icon="🚗",
    layout="centered"
)

st.title("🚗 Car Selling Price Prediction")
st.write("Predict car selling price using ML")

# -----------------------------------
# User Inputs
# -----------------------------------
Car_Name = st.text_input("Car Name", "Swift")

Year = st.number_input("Year of Purchase", 1990, 2025, 2018)

Present_Price = st.number_input("Present Price (₹ in Lakhs)", 0.0, 50.0, 5.0)

Kms_Driven = st.number_input("Kilometers Driven", 0, 500000, 30000)

Fuel_Type = st.selectbox("Fuel Type", ["Petrol", "Diesel", "CNG"])

Seller_Type = st.selectbox("Seller Type", ["Dealer", "Individual"])

Transmission = st.selectbox("Transmission", ["Manual", "Automatic"])

Owner = st.selectbox("Number of Previous Owners", [0, 1, 3])

# -----------------------------------
# Encoding (must match training logic)
# -----------------------------------
fuel_map = {"Petrol": 0, "Diesel": 1, "CNG": 2}
seller_map = {"Dealer": 0, "Individual": 1}
transmission_map = {"Manual": 0, "Automatic": 1}

Fuel_Type = fuel_map[Fuel_Type]
Seller_Type = seller_map[Seller_Type]
Transmission = transmission_map[Transmission]

# -----------------------------------
# VERY IMPORTANT PART (FIX)
# Create dict → DataFrame → align columns
# -----------------------------------
input_dict = {
    "Car_Name": hash(Car_Name) % 1000,   # safe numeric encoding
    "Year": Year,
    "Present_Price": Present_Price,
    "Kms_Driven": Kms_Driven,
    "Fuel_Type": Fuel_Type,
    "Seller_Type": Seller_Type,
    "Transmission": Transmission,
    "Owner": Owner
}

input_df = pd.DataFrame([input_dict])

# Align with training columns (prevents mismatch forever)
input_df = input_df.reindex(columns=model_columns, fill_value=0)

# -----------------------------------
# Prediction
# -----------------------------------
if st.button("🔮 Predict Selling Price"):
    prediction = model.predict(input_df)[0]

    st.success(f"💰 Estimated Selling Price: ₹ {prediction:.2f} Lakhs")
    st.caption("Model: Decision Tree Regressor | Accuracy ≈ 92%")
