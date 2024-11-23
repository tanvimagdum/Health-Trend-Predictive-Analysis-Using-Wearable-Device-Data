import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

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

    # Visualizing Sleep Clusters
    plt.figure(figsize=(8, 6))
    sns.scatterplot(x='TotalHoursAsleep', y='TotalHoursInBed', hue='SleepCluster', data=df_sleep, palette='Set1')
    plt.title('Sleep Clusters: Total Hours Asleep vs Time in Bed')
    plt.xlabel('Total Hours Asleep')
    plt.ylabel('Total Time in Bed')
    plt.legend(title='Sleep Cluster')
    plt.show()

    # Sleep Summary for Each Cluster
    sleep_summary = df_sleep.groupby('SleepCluster').agg({
        'TotalHoursAsleep': ['mean', 'std'],
        'TotalHoursInBed': ['mean', 'std'],
        'AverageSleepDuration': ['mean', 'std']
    }).reset_index()

    print(sleep_summary)
