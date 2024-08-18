from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

app = Flask(__name__)

# Load and prepare the model
data = pd.read_csv("/train.csv")

X = data.drop(labels=["v.id", "on road old", "on road now", "current price"], axis=1)
Y = data["current price"]
X_train, X_test, y_train, y_test = train_test_split(X, Y, train_size=0.8)

model = RandomForestRegressor(
    n_jobs=-1,
    random_state=42,
    n_estimators=80,
    min_samples_split=14,
    min_samples_leaf=6,
    max_samples=620,
    max_depth=3
)

model.fit(X_train, y_train)


@app.route('/predict', methods=['POST'])
def predict():
    # Assume that the incoming data is a JSON array of objects that match the features used in training
    input_data = request.json
    # Convert input data to DataFrame
    input_df = pd.DataFrame(input_data)

    # Ensure the input data columns match the training data's columns
    # This can include steps to handle missing columns, extra columns, etc.
    prediction = model.predict(input_df)

    # Convert the predictions to a list and return as JSON
    return jsonify(predictions=prediction.tolist())


if __name__ == '__main__':
    app.run()
