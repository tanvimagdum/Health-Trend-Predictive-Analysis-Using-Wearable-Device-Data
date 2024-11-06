import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Load the dataset
DailyActivity = 'dataset/new-data/dailyActivity.csv'
DailyCalories = 'dataset/new-data/dailyCalories.csv'
DailySteps = 'dataset/new-data/dailySteps.csv'
DailySleep = 'dataset/new-data/sleepDay.csv'
HeartRateSeconds = 'dataset/new-data/heartrate_seconds.csv'

df_activity = pd.read_csv(DailyActivity)
df_calories = pd.read_csv(DailyCalories)
df_steps = pd.read_csv(DailySteps)
df_sleep = pd.read_csv(DailySleep)
df_heartrate = pd.read_csv(HeartRateSeconds)

print(df_activity.duplicated().sum())
print(df_calories.duplicated().sum())
print(df_steps.duplicated().sum())
print(df_sleep.duplicated().sum())
print(df_heartrate.duplicated().sum())


# 1. Cleaning Daily Activity Data
df_activity.columns = df_activity.columns.str.strip()  # Remove any leading/trailing spaces in column names
df_activity['ActivityDate'] = pd.to_datetime(df_activity['ActivityDate'], errors='coerce')  # Convert to datetime
df_activity = df_activity.dropna()  # Drop rows with NA in 'ActivityDate'
df_activity = df_activity.drop_duplicates()  # Remove any duplicate rows

# 2. Cleaning Daily Calorie Count Data
df_calories.columns = df_calories.columns.str.strip()
df_calories['ActivityDay'] = pd.to_datetime(df_calories['ActivityDay'], errors='coerce')
df_calories = df_calories.dropna()
df_calories = df_calories.drop_duplicates()

# 3. Cleaning Daily Steps Data
df_steps.columns = df_steps.columns.str.strip()
df_steps['ActivityDay'] = pd.to_datetime(df_steps['ActivityDay'], errors='coerce')
df_steps = df_steps.dropna()
df_steps = df_steps.drop_duplicates()

# 4. Cleaning Daily Sleep Data
df_sleep.columns = df_sleep.columns.str.strip()
df_sleep['SleepDay'] = pd.to_datetime(df_sleep['SleepDay'], errors='coerce')
df_sleep = df_sleep.dropna()
df_sleep = df_sleep.drop_duplicates()

# 5. Cleaning Heart Rate Data
df_heartrate.columns = df_heartrate.columns.str.strip()
df_heartrate['Time'] = pd.to_datetime(df_heartrate['Time'], errors='coerce')
df_heartrate = df_heartrate.dropna()
df_heartrate = df_heartrate.drop_duplicates()

print(" ")
print(df_activity.duplicated().sum())
print(df_calories.duplicated().sum())
print(df_steps.duplicated().sum())
print(df_sleep.duplicated().sum())
print(df_heartrate.duplicated().sum())
