# Health-Trend-Predictive-Analysis-Using-Wearable-Device-Data

## Project Overview

The Heart Rate Analysis Dashboard is an interactive web application designed to analyze and predict heart rate fluctuations using data collected from Fitbit devices. It uses machine learning models like Linear Regression and Random Forest to forecast future heart rate values based on historical data, providing insights into trends such as resting heart rate, peak heart rate, and overall health patterns.

## Key Features

Interactive Input: Users can enter their User ID to analyze their heart rate trends.
Data Visualization: Visual comparison of actual and predicted heart rate values using Plotly charts, trends in activity and sleep.
Predictive Modeling: Forecasts future heart rates using Linear Regression and Random Forest models.
Metrics Dashboard: Displays key metrics such as average, resting, and peak heart rates.
Error Handling: Ensures smooth user experience with appropriate error messages for invalid input or missing data.

## Technologies Used

### Frontend

React with Material-UI for an interactive user interface.
Framer Motion for animations and smooth transitions.
Axios for API communication.
Plotly for creating detailed and interactive data visualizations.

### Backend

Python (Flask): REST API for data processing and model predictions.
Pandas: Data manipulation and preprocessing.
Scikit-learn: Machine learning models for prediction.
NumPy: Numerical computations.

## Setup Instructions

### Backend Setup

Clone the repository.
Install required Python dependencies: pip install -r requirements.txt
Place the Fitbit heart rate data (heartrate_seconds.csv) in the dataset/new-data.
Run the Flask server: python app.py

### Frontend Setup

Navigate to the frontend folder.
Install dependencies: npm install
Start the development server: npm start

## Usage

1. Start both the backend and frontend servers.
2. Open the web app in your browser (http://localhost:3000).
3. Navigate to Heart Rate Analysis.
4. Enter a valid User ID to generate analysis.
5. View metrics and interactive charts for heart rate predictions and trends.
6. Navigate to Sleep Patterns to observe sleep patterns and metrics.
7. Navigate to Trend Tracking to observe trends in different activity metrics like calories, total steps, active minutes with interactive charts.
