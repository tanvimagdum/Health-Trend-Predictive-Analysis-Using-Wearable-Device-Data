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
