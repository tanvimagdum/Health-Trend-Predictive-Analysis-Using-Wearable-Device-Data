import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Print the current working directory
print("Current working directory:", os.getcwd())

# Read the datasets - add error handling and verification
daily_activity = pd.read_csv('dataset/new-data/dailyActivity.csv')
print("Daily Activity shape:", daily_activity.shape)
print("Daily Activity columns:", daily_activity.columns.tolist())

# Add verification step
if 'ActivityDate' not in daily_activity.columns:
    raise ValueError("CSV file appears to be a Git LFS pointer. Please pull the actual data file using 'git lfs pull'")

daily_calories = pd.read_csv('dataset/new-data/dailyCalories.csv')

# Convert ActivityDate to datetime
daily_activity['ActivityDate'] = pd.to_datetime(daily_activity['ActivityDate'])
daily_calories['ActivityDay'] = pd.to_datetime(daily_calories['ActivityDay'])

# Merge the datasets
merged_df = pd.merge(daily_activity, daily_calories, 
                    left_on=['Id', 'ActivityDate'],
                    right_on=['Id', 'ActivityDay'])

# Select features for regression
features = ['TotalSteps', 'TotalDistance', 'VeryActiveMinutes', 
           'FairlyActiveMinutes', 'LightlyActiveMinutes', 'SedentaryMinutes']
X = merged_df[features]
y = merged_df['Calories_x']  # Using calories from activity dataset

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

# Print results
print("\nRegression Results:")
print("R-squared Score:", r2)
print("Root Mean Squared Error:", rmse)
print("\nFeature Coefficients:")
for feature, coef in zip(features, model.coef_):
    print(f"{feature}: {coef:.2f}")

# Create correlation heatmap
plt.figure(figsize=(10, 8))
correlation_matrix = merged_df[features + ['Calories_x']].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Heatmap')
plt.tight_layout()
plt.savefig('correlation_heatmap.png')
plt.close()

# Create scatter plot for the most important feature
most_important_feature = features[np.argmax(abs(model.coef_))]
plt.figure(figsize=(10, 6))
plt.scatter(merged_df[most_important_feature], merged_df['Calories_x'])
plt.xlabel(most_important_feature)
plt.ylabel('Calories')
plt.title(f'Calories vs {most_important_feature}')
plt.savefig('scatter_plot.png')
plt.close() 