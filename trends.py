import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

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

# Check for duplicates
print(df_activity.duplicated().sum())
print(df_calories.duplicated().sum())
print(df_steps.duplicated().sum())
print(df_sleep.duplicated().sum())
print(df_heartrate.duplicated().sum())

# 1. Cleaning Daily Activity Data
df_activity.columns = df_activity.columns.str.strip()
df_activity['ActivityDate'] = pd.to_datetime(df_activity['ActivityDate'], errors='coerce')
df_activity = df_activity.dropna().drop_duplicates()

# 2. Cleaning Daily Calorie Count Data
df_calories.columns = df_calories.columns.str.strip()
df_calories['ActivityDay'] = pd.to_datetime(df_calories['ActivityDay'], errors='coerce')
df_calories = df_calories.dropna().drop_duplicates()

# 3. Cleaning Daily Steps Data
df_steps.columns = df_steps.columns.str.strip()
df_steps['ActivityDay'] = pd.to_datetime(df_steps['ActivityDay'], errors='coerce')
df_steps = df_steps.dropna().drop_duplicates()

# 4. Cleaning Daily Sleep Data
df_sleep.columns = df_sleep.columns.str.strip()
df_sleep['SleepDay'] = pd.to_datetime(df_sleep['SleepDay'], errors='coerce')
df_sleep = df_sleep.dropna().drop_duplicates()

# 5. Cleaning Heart Rate Data
df_heartrate.columns = df_heartrate.columns.str.strip()
df_heartrate['Time'] = pd.to_datetime(df_heartrate['Time'], errors='coerce')
df_heartrate = df_heartrate.dropna().drop_duplicates()

# Check for duplicates
print(df_activity.duplicated().sum())
print(df_calories.duplicated().sum())
print(df_steps.duplicated().sum())
print(df_sleep.duplicated().sum())
print(df_heartrate.duplicated().sum())

# Additional Preprocessing Steps

# 6. Detect and Remove Outliers (Example with IQR for 'TotalSteps' in Daily Activity data)
Q1 = df_activity['TotalSteps'].quantile(0.25)
Q3 = df_activity['TotalSteps'].quantile(0.75)
IQR = Q3 - Q1
df_activity = df_activity[~((df_activity['TotalSteps'] < (Q1 - 1.5 * IQR)) | (df_activity['TotalSteps'] > (Q3 + 1.5 * IQR)))]

# 7. Normalization of Numeric Columns
scaler = MinMaxScaler()
numerical_cols = ['TotalSteps', 'TotalDistance', 'Calories', 'VeryActiveMinutes', 'FairlyActiveMinutes', 'LightlyActiveMinutes']
df_activity[numerical_cols] = scaler.fit_transform(df_activity[numerical_cols])

# 8. Data Visualization
# Distribution of Total Steps after Outlier Removal
plt.figure(figsize=(10, 5))
sns.histplot(df_activity['TotalSteps'], kde=True)
plt.title('Distribution of Total Steps After Outlier Removal')
plt.show()

# 9. Correlation Analysis
plt.figure(figsize=(12, 8))
corr_matrix = df_activity.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Matrix')
plt.show()

# 10. Save Preprocessed Data
df_activity.to_csv('preprocessed_activity_data.csv', index=False)
print("Preprocessed data saved to 'preprocessed_activity_data.csv'.")
