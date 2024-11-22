import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Load the dataset
DailyActivity = 'dataset/new-data/dailyActivity.csv'
DailySleep = 'dataset/new-data/sleepDay.csv'
HeartRateSeconds = 'dataset/new-data/heartrate_seconds.csv'

df_activity = pd.read_csv(DailyActivity)
df_sleep = pd.read_csv(DailySleep)
df_heartrate = pd.read_csv(HeartRateSeconds)

## Data Cleaning Steps ##

# Check for duplicates
# print(df_activity.duplicated().sum())
# print(df_sleep.duplicated().sum())
# print(df_heartrate.duplicated().sum())

# Cleaning Daily Activity Data
df_activity.columns = df_activity.columns.str.strip()
df_activity['ActivityDate'] = pd.to_datetime(df_activity['ActivityDate'], errors='coerce')
df_activity = df_activity.dropna().drop_duplicates()

# Cleaning Daily Sleep Data
df_sleep.columns = df_sleep.columns.str.strip()
df_sleep['SleepDay'] = pd.to_datetime(df_sleep['SleepDay'], errors='coerce')
df_sleep = df_sleep.dropna().drop_duplicates()

# Cleaning Heart Rate Data
df_heartrate.columns = df_heartrate.columns.str.strip()
df_heartrate['Time'] = pd.to_datetime(df_heartrate['Time'], errors='coerce')
df_heartrate = df_heartrate.dropna().drop_duplicates()

# Check for duplicates
# print(df_activity.duplicated().sum())
# print(df_sleep.duplicated().sum())
# print(df_heartrate.duplicated().sum())

## Data Preprocessing Steps ##

# Detect and Remove Outliers for TotalSteps
# Remove rows where all numeric columns are zero

numerical_cols = ['TotalSteps', 'TotalDistance', 'Calories', 'VeryActiveMinutes', 'FairlyActiveMinutes', 'LightlyActiveMinutes', 'SedentaryMinutes']
df_activity = df_activity[~(df_activity[numerical_cols].sum(axis=1) == 0)]

Q1 = df_activity['TotalSteps'].quantile(0.25)
Q3 = df_activity['TotalSteps'].quantile(0.75)
IQR = Q3 - Q1
df_activity = df_activity[~((df_activity['TotalSteps'] < (Q1 - 1.5 * IQR)) | (df_activity['TotalSteps'] > (Q3 + 1.5 * IQR)))]

# Detect and Remove Outliers for Calories
Q1 = df_activity['Calories'].quantile(0.25)
Q3 = df_activity['Calories'].quantile(0.75)
IQR = Q3 - Q1
df_activity = df_activity[~((df_activity['Calories'] < (Q1 - 1.5 * IQR)) | (df_activity['Calories'] > (Q3 + 1.5 * IQR)))]

# Initialize the scaler
scaler = MinMaxScaler()

# Normalization of Numeric Columns for Activity
df_activity[numerical_cols] = scaler.fit_transform(df_activity[numerical_cols])

# Combine activity levels to get TotalActivityMinutes
df_activity['TotalActiveMinutes'] = df_activity['VeryActiveMinutes'] + df_activity['FairlyActiveMinutes'] + df_activity['LightlyActiveMinutes']

# Calculate total sleep duration in hours
df_sleep['TotalHoursAsleep'] = df_sleep['TotalMinutesAsleep'] / 60

# Normalization of Numeric Columns for Sleep
df_sleep[['TotalMinutesAsleep', 'TotalTimeInBed']] = scaler.fit_transform(
    df_sleep[['TotalMinutesAsleep', 'TotalTimeInBed']]
)

# Convert Time to datetime and resample to minute for consistent intervals
df_heartrate.set_index('Time', inplace=True)
df_heartrate = df_heartrate.between_time('07:00', '20:00')
df_heartrate = df_heartrate.resample('1Min').median().dropna()

# Check the preprocessed data
# print("Activity Data:\n", df_activity.head())
# print("\nSleep Data:\n", df_sleep.head())
# print("\nHeart Rate Data:\n", df_heartrate.head())