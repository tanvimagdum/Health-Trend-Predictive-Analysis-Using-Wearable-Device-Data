import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import plotly.graph_objects as go
from flask import Blueprint, jsonify, request
import plotly.io as pio

bp = Blueprint('heartrateFluctuations', __name__)

@bp.route('/heartratefluctuations', methods=['GET'])
def display_hrfluctuations():
    try:
        # Extract parameters
        user_id = int(request.args.get('user_id'))

        # Load data
        df_heartrate = pd.read_csv('dataset/new-data/heartrate_seconds.csv', parse_dates=['Time'])

        # Filter data for the user
        # user_id = 2022484408, 4388161847, 6117666160
        user_data = df_heartrate[df_heartrate['Id'] == user_id]
        if user_data.empty:
            return jsonify({"error": "User ID not found"}), 404

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

        # Lag_1   Lag_2   Lag_3
        # NaN     NaN     NaN
        # 100     NaN     NaN
        # 105     100     NaN
        # 110     105     100
        # 115     110     105
        # 120     115     110
        # Value for Hour 6, the model might use 
        # Lag_1 (120), Lag_2 (115), and Lag_3 (110) as input

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
        accuracy_lr = 100 - mape
        print(f"Accuracy: {accuracy_lr:.2f}%")

        # Interactive Plot with Plotly for Linear Regression
        fig_lr = go.Figure()
        fig_lr.add_trace(go.Scatter(y=y_test.values, mode='lines+markers', name='Actual Heart Rate', marker=dict(color='blue')))
        fig_lr.add_trace(go.Scatter(y=y_pred, mode='lines+markers', name='Predicted Heart Rate (Linear Regression)', marker=dict(color='red')))

        fig_lr.update_layout(
            title="Actual vs Predicted Heart Rate (Linear Regression)",
            xaxis_title="Time (Index)",
            yaxis_title="Heart Rate (bpm)",
            legend=dict(x=0.02, y=0.95),
            template="plotly_white",
            width=1100, 
            height=600
        )
        fig_lr_json = pio.to_json(fig_lr)


        # Initialize Random Forest Regressor
        rf_model = RandomForestRegressor(n_estimators=100, random_state=42)

        # Train the model
        rf_model.fit(X_train, y_train)

        # Make predictions
        y_pred_rf = rf_model.predict(X_test)

        # Evaluate the model
        mae_rf = mean_absolute_error(y_test, y_pred_rf)
        r2_rf = r2_score(y_test, y_pred_rf)

        # Calculate MAPE
        mape_rf = np.mean(np.abs((y_test - y_pred_rf) / y_test)) * 100
        accuracy_rf = 100 - mape_rf

        # Print results
        print(f"Random Forest MAE: {mae_rf:.2f}")
        print(f"Random Forest Accuracy: {accuracy_rf:.2f}%")

        # Interactive Plot with Plotly for Random Forest
        fig_rf = go.Figure()
        fig_rf.add_trace(go.Scatter(y=y_test.values, mode='lines+markers', name='Actual Heart Rate', marker=dict(color='blue')))
        fig_rf.add_trace(go.Scatter(y=y_pred_rf, mode='lines+markers', name='Predicted Heart Rate (Random Forest)', marker=dict(color='green')))

        fig_rf.update_layout(
            title="Actual vs Predicted Heart Rate (Random Forest)",
            xaxis_title="Time (Index)",
            yaxis_title="Heart Rate (bpm)",
            legend=dict(x=0.02, y=0.95),
            template="plotly_white",
            width=1100, 
            height=600
        )
        fig_rf_json = pio.to_json(fig_rf)

        # Compare with the previous model
        print("\nComparison:")
        print(f"Previous Model Accuracy: {accuracy_lr:.2f}%")
        print(f"Random Forest Accuracy: {accuracy_rf:.2f}%")

        return jsonify({
            "fig_lr": fig_lr_json, 
            "fig_rf": fig_rf_json, 
            "accuracy_lr": round(accuracy_lr, 2), 
            "accuracy_rf": round(accuracy_rf, 2),
            "average_heart_rate": round(hourly_data.mean()), 
            "resting_heart_rate": round(hourly_data.nsmallest(int(len(hourly_data) * 0.1)).mean()),
            "peak_heart_rate": round(hourly_data.max()),
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
