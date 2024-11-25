import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TimerIcon from "@mui/icons-material/Timer";
import SpeedIcon from "@mui/icons-material/Speed";
import axios from "axios";
import Plot from "react-plotly.js";

function HeartRateAnalysis() {
  const theme = useTheme();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPlots, setShowPlots] = useState(false);
  const [plots, setPlots] = useState({
    fig_lr: null,
    fig_rf: null,
    accuracy_lr: 0,
    accuracy_rf: 0,
    average_heart_rate: 0,
    resting_heart_rate: 0,
    peak_heart_rate: 0,
  });

  const metrics = [
    {
      title: "Average Heart Rate",
      value: `${plots.average_heart_rate} bpm`,
      icon: <FavoriteIcon sx={{ color: theme.palette.error.main }} />,
      color: theme.palette.error.main,
    },
    {
      title: "Resting Heart Rate",
      value: `${plots.resting_heart_rate} bpm`,
      icon: <TimerIcon sx={{ color: theme.palette.success.main }} />,
      color: theme.palette.success.main,
    },
    {
      title: "Peak Heart Rate",
      value: `${plots.peak_heart_rate} bpm`,
      icon: <SpeedIcon sx={{ color: theme.palette.info.main }} />,
      color: theme.palette.info.main,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/heartratefluctuations",
        {
          params: { user_id: userId },
        }
      );
      const {
        fig_lr,
        fig_rf,
        accuracy_lr,
        accuracy_rf,
        average_heart_rate,
        resting_heart_rate,
        peak_heart_rate,
      } = response.data;

      setPlots({
        fig_lr: JSON.parse(fig_lr),
        fig_rf: JSON.parse(fig_rf),
        accuracy_lr: accuracy_lr,
        accuracy_rf: accuracy_rf,
        average_heart_rate: average_heart_rate,
        resting_heart_rate: resting_heart_rate,
        peak_heart_rate: peak_heart_rate,
      });
      setShowPlots(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Section */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          background: "linear-gradient(135deg, #3366FF 0%, #6690FF 100%)",
          color: "white",
          borderRadius: 1,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Heart Rate Analysis Dashboard
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Enter User ID to analyze heart rate patterns"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={loading}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    height: 56,
                    backgroundColor: "white",
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <SearchIcon />
                  }
                >
                  {loading ? "Analyzing..." : "Generate Analysis"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Metrics Section */}
      {showPlots && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={0} sx={{ borderRadius: 1, padding: "5px" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "10px",
                          backgroundColor: `${metric.color}25`,
                          mr: 2,
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Typography variant="h6" color="text.secondary">
                        {metric.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                      <Typography variant="h4" sx={{ mr: 2, fontWeight: 600 }}>
                        {metric.value}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* LR Analysis */}
          <Card elevation={0} sx={{ borderRadius: 1, width: "auto" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  padding: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: 600, marginLeft: "30px" }}
                >
                  Linear Regression Analysis
                </Typography>
              </Box>
              <Plot data={plots.fig_lr.data} layout={plots.fig_lr.layout} />
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, marginLeft: "30px" }}
                >
                  Accuracy: {plots.accuracy_lr}%
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* RF Analysis */}
          <Card elevation={0} sx={{ borderRadius: 1, width: "auto", mt: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  padding: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: 600, marginLeft: "30px" }}
                >
                  Random Forest Analysis
                </Typography>
              </Box>
              <Plot data={plots.fig_rf.data} layout={plots.fig_rf.layout} />
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, marginLeft: "30px" }}
                >
                  Accuracy: {plots.accuracy_rf}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

export default HeartRateAnalysis;
