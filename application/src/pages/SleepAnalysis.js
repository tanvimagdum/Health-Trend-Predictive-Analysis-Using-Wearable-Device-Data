import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  // Grid,
  // Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  // LineChart,
  // Line,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";
// import BedtimeIcon from "@mui/icons-material/Bedtime";
// import TimerIcon from "@mui/icons-material/Timer";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axios from "axios";
import Plot from "react-plotly.js";

function SleepAnalysis() {
  const [loading, setLoading] = useState(true);
  const [plots, setPlots] = useState({
    fig1: null,
    fig2: null,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/sleeppatterns")
      .then((response) => {
        const { fig1, fig2 } = response.data;
        setPlots({
          fig1: JSON.parse(fig1),
          fig2: JSON.parse(fig2),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // const sleepMetrics = [
  //   {
  //     icon: <BedtimeIcon />,
  //     label: "Average Sleep Duration",
  //     value: "7h 15m",
  //     trend: "+45m from last week",
  //     color: "#8DE8F2",
  //   },
  //   {
  //     icon: <TimerIcon />,
  //     label: "Sleep Quality Score",
  //     value: "85%",
  //     trend: "+5% from last week",
  //     color: "#FF4757",
  //   },
  //   {
  //     icon: <TrendingUpIcon />,
  //     label: "Deep Sleep Ratio",
  //     value: "32%",
  //     trend: "+3% from last week",
  //     color: "#3366FF",
  //   },
  // ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Metrics Cards */}
      {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        {sleepMetrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: `${metric.color}15`,
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      color: metric.color,
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Typography variant="h6">{metric.label}</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {metric.value}
                </Typography>
                <Chip
                  label={metric.trend}
                  size="small"
                  icon={<TrendingUpIcon />}
                  color="success"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}

      {/* Sleep Pattern Graph */}
      <Card>
        <CardContent>
          <Typography variant="h6" padding="10px" marginLeft="10px">
            Sleep Patterns Over a Month
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: "auto", mt: 2 }}>
              {/* Plotly graph for Sleep Clusters */}
              <Plot data={plots.fig1.data} layout={plots.fig1.layout} />
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" padding="10px" marginLeft="10px">
            Sleep Metrics
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: "auto", mt: 2 }}>
              {/* Plotly graph for Sleep Clusters */}
              <Plot data={plots.fig2.data} layout={plots.fig2.layout} />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Analysis Description */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sleep Analysis Insights
          </Typography>
          <Typography paragraph>Based on these patterns.....</Typography>
          <Typography paragraph>Key Observations:</Typography>
          <ul>
            <Typography component="li">Optimal sleep duration</Typography>
            <Typography component="li">Deep sleep cycles</Typography>
            <Typography component="li">
              REM sleep patterns indicate healthy stress management
            </Typography>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SleepAnalysis;
