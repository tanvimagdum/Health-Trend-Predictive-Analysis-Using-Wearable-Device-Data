import pandas as pd
import plotly.express as px
from sklearn.cluster import KMeans
from flask import Blueprint, jsonify
import plotly.io as pio

bp = Blueprint('sleepPatterns', __name__)

@bp.route('/sleeppatterns', methods=['GET'])
def display_sleep_patterns():
        
    # Load the dataset
    DailySleep = 'dataset/new-data/sleepDay.csv'

    df_sleep = pd.read_csv(DailySleep)

    # Data Cleaning
    df_sleep.columns = df_sleep.columns.str.strip()  # Remove extra spaces in column names
    df_sleep['SleepDay'] = pd.to_datetime(df_sleep['SleepDay'], errors='coerce')  # Convert to datetime
    df_sleep = df_sleep.dropna().drop_duplicates()  # Drop NA and duplicates

    # Calculate total sleep duration in hours
    df_sleep['TotalHoursAsleep'] = df_sleep['TotalMinutesAsleep'] / 60
    df_sleep['TotalHoursInBed'] = df_sleep['TotalTimeInBed'] / 60

    # Feature Engineering: Calculate Average Sleep Duration
    df_sleep['AverageSleepDuration'] = df_sleep['TotalMinutesAsleep'] / 60

    # Clustering Sleep Patterns (K-Means Clustering)
    kmeans = KMeans(n_clusters=3, random_state=42)
    df_sleep['SleepCluster'] = kmeans.fit_predict(df_sleep[['TotalHoursAsleep', 'TotalHoursInBed']])

    
    # Visualization 1: Sleep Clusters
    fig1 = px.scatter(
        df_sleep,
        x='TotalHoursAsleep',
        y='TotalHoursInBed',
        color='SleepCluster',
        title='Sleep Clusters: Total Hours Asleep vs Time in Bed',
        labels={'TotalHoursAsleep': 'Total Hours Asleep', 'TotalHoursInBed': 'Total Time in Bed'},
        color_continuous_scale='Bluered',
    )
    fig1.update_layout(xaxis_title='Total Hours Asleep', yaxis_title='Total Time in Bed', 
                       legend_title='Sleep Cluster', width=1000, height=600 )
    fig1_json = pio.to_json(fig1)

    # Visualization 2: Average Sleep Metrics by Cluster
    sleep_summary = df_sleep.groupby('SleepCluster').agg({
        'TotalHoursAsleep': 'mean',
        'TotalHoursInBed': 'mean',
        'AverageSleepDuration': 'mean'
    }).reset_index()

    fig2 = px.bar(
        sleep_summary,
        x='SleepCluster',
        y=['TotalHoursAsleep', 'TotalHoursInBed', 'AverageSleepDuration'],
        title='Average Sleep Metrics by Cluster',
        labels={'value': 'Average (Hours)', 'variable': 'Metric'},
        barmode='group',
        text_auto=True,
    )
    fig2.update_layout(xaxis_title='Sleep Cluster', yaxis_title='Average Hours', 
                       legend_title='Metric', width=1000, height=600 )
    fig2_json = pio.to_json(fig2)

    return jsonify({"fig1": fig1_json, "fig2": fig2_json})
