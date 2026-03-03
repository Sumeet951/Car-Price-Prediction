import { useState } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    Car_Name: "",
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Fuel_Type: "Petrol",
    Seller_Type: "Dealer",
    Transmission: "Manual",
    Owner: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );
      setPrediction(res.data.predicted_price);
    } catch (err) {
      alert("Error predicting price");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🚗 Car Price Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="Car_Name"
            placeholder="Car Name"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="Year"
            placeholder="Year"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="Present_Price"
            placeholder="Present Price (in Lakhs)"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="Kms_Driven"
            placeholder="Kilometers Driven"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />

          <select
            name="Fuel_Type"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>CNG</option>
          </select>

          <select
            name="Seller_Type"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          >
            <option>Dealer</option>
            <option>Individual</option>
          </select>

          <select
            name="Transmission"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          >
            <option>Manual</option>
            <option>Automatic</option>
          </select>

          <input
            type="number"
            name="Owner"
            placeholder="Owner (0 = First Owner)"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>

        {prediction && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              💰 Predicted Price:
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              ₹ {prediction} Lakhs
            </p>
          </div>
        )}
      </div>
    </div>
  );
}