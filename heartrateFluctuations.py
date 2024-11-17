import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

# Load data
df_heartrate = pd.read_csv('dataset/new-data/heartrate_seconds.csv', parse_dates=['Time'])

# Filter data for a single user
user_id = 2022484408
user_data = df_heartrate[df_heartrate['Id'] == user_id]

# Resample to hourly averages
user_data.set_index('Time', inplace=True)
user_data = user_data.between_time('07:00', '20:00')
hourly_data = user_data['Value'].resample('1h').mean()
print(hourly_data.head(10))

# Interpolate missing values
hourly_data = hourly_data.interpolate()

# Create lag features (using the last few hours to predict the next hour)
lag_features = pd.concat([hourly_data.shift(i) for i in range(1, 4)], axis=1)
lag_features.columns = ['Lag_1', 'Lag_2', 'Lag_3']

# Add the target variable
data = pd.concat([lag_features, hourly_data], axis=1)
data.columns = ['Lag_1', 'Lag_2', 'Lag_3', 'Target']

# Drop rows with NaN values (from lagging)
data = data.dropna()

# Train-test split
X = data[['Lag_1', 'Lag_2', 'Lag_3']]
y = data['Target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate the model
rmse = mean_squared_error(y_test, y_pred)
print(f'Root Mean Squared Error (RMSE): {rmse}')

# Calculate MAPE
mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
accuracy = 100 - mape
print(f"Accuracy: {accuracy:.2f}%")

# Plot actual vs predicted values
plt.figure(figsize=(12, 6))
plt.plot(y_test.values, label='Actual', marker='o')
plt.plot(y_pred, label='Predicted', marker='x')
plt.title('Actual vs Predicted Heart Rate')
plt.xlabel('Time (Index)')
plt.ylabel('Heart Rate (bpm)')
plt.legend()
plt.show()
