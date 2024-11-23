import plotly.express as px
import plotly.graph_objects as go
import plotly.figure_factory as ff
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler


def display_trends():
        
    # Load data
    df_activity = pd.read_csv('dataset/new-data/dailyActivity.csv')

    # Clean data
    df_activity.columns = df_activity.columns.str.strip()
    df_activity['ActivityDate'] = pd.to_datetime(df_activity['ActivityDate'], errors='coerce')
    df_activity['Weekday'] = df_activity['ActivityDate'].dt.day_name()
    df_activity = df_activity.dropna().drop_duplicates()

    numerical_cols = ['TotalSteps', 'TotalDistance', 'Calories', 'VeryActiveMinutes', 'FairlyActiveMinutes', 'LightlyActiveMinutes', 'SedentaryMinutes']

    # Remove outliers for total steps
    Q1 = df_activity['TotalSteps'].quantile(0.25)
    Q3 = df_activity['TotalSteps'].quantile(0.75)
    IQR = Q3 - Q1
    df_activity = df_activity[~((df_activity['TotalSteps'] < (Q1 - 1.5 * IQR)) | (df_activity['TotalSteps'] > (Q3 + 1.5 * IQR)))]

    # Remove outliers for calories
    Q1 = df_activity['Calories'].quantile(0.25)
    Q3 = df_activity['Calories'].quantile(0.75)
    IQR = Q3 - Q1
    df_activity = df_activity[~((df_activity['Calories'] < (Q1 - 1.5 * IQR)) | (df_activity['Calories'] > (Q3 + 1.5 * IQR)))]

    # Combine activity levels to get TotalActivityMinutes
    df_activity['TotalActiveMinutes'] = df_activity['VeryActiveMinutes'] + df_activity['FairlyActiveMinutes'] + df_activity['LightlyActiveMinutes']

    # Visualization 1: Activity Distribution Over Weekdays
    weekday_activity = df_activity.groupby('Weekday')[['TotalSteps', 'Calories', 'TotalActiveMinutes']].mean().round()
    weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    weekday_activity = weekday_activity.reindex(weekday_order)
    fig1 = px.bar(
        weekday_activity,
        title="Average Activity Metrics Across Weekdays",
        labels={'value': 'Average Value', 'variable': 'Activity Type'},
        barmode='group',
        text_auto=True
    )
    fig1.update_layout(xaxis_title='Weekday', yaxis_title='Average Value', legend_title='Activity Type')
    fig1.show()

    # Visualization 2: Heatmap of Activity Correlations
    corr_matrix = df_activity[numerical_cols].corr()
    fig2 = px.imshow(
        corr_matrix,
        title='Correlation Heatmap of Activity Metrics',
        labels=dict(x='Metrics', y='Metrics', color='Correlation'),
        x=numerical_cols,
        y=numerical_cols,
        color_continuous_scale='agsunset',
        zmin=-1,
        zmax=1
    )
    fig2.show()

    # Initialize the scaler
    scaler = MinMaxScaler()

    # Normalization of Numeric Columns for Activity
    df_activity[numerical_cols] = scaler.fit_transform(df_activity[numerical_cols])

    # Visualization 3: Total Active Minutes vs. Calories (Aggregated)
    agg_data = df_activity.groupby('ActivityDate')[['TotalActiveMinutes', 'Calories']].sum().reset_index()
    fig3 = px.scatter(
        agg_data,
        x='TotalActiveMinutes',
        y='Calories',
        title='Calories Burned vs. Total Active Minutes (Aggregated)',
        labels={'TotalActiveMinutes': 'Total Active Minutes', 'Calories': 'Calories Burned'},
        trendline='ols'
    )
    fig3.show()

    # Visualization 4: Activity Trends Over Time for a Single User
    user_id = df_activity['Id'].unique()[0]
    user_data = df_activity[df_activity['Id'] == user_id]
    fig4 = go.Figure()
    fig4.add_trace(
        go.Scatter(
            x=user_data['ActivityDate'],
            y=user_data['TotalSteps'],
            mode='lines+markers',
            name='Total Steps',
            line=dict(color='blue', width=2)
        )
    )
    fig4.add_trace(
        go.Scatter(
            x=user_data['ActivityDate'],
            y=user_data['Calories'],
            mode='lines+markers',
            name='Calories Burned',
            line=dict(color='red', width=2)
        )
    )
    fig4.update_layout(
        title=f'Activity Trends Over Time for User {user_id}',
        xaxis_title='Date',
        yaxis_title='Values',
        legend_title='Metrics',
        hovermode='x unified'
    )
    fig4.show()