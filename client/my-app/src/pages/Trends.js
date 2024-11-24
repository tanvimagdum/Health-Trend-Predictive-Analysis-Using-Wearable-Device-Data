import React, { useEffect, useState } from "react";
import {
  // Grid,
  // Card,
  // CardContent,
  Typography,
  Box,
  // IconButton,
  // Chip,
  // useTheme,
  // Button,
  // Divider,
} from "@mui/material";
import { motion } from "framer-motion";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import axios from "axios";
import Plot from "react-plotly.js";

// function TrendCard({ trend, index }) {
//   const theme = useTheme();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//     >
//       <Card
//         elevation={0}
//         sx={{
//           height: "100%",
//           borderRadius: 3,
//           "&:hover": {
//             transform: "translateY(-4px)",
//             transition: "transform 0.3s ease-in-out",
//             boxShadow: theme.shadows[4],
//           },
//         }}
//       >
//         <CardContent>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Chip
//               label={trend.category}
//               size="small"
//               color="primary"
//               sx={{ borderRadius: 1 }}
//             />
//             <IconButton size="small">
//               <MoreVertIcon />
//             </IconButton>
//           </Box>

//           <Box
//             sx={{
//               position: "relative",
//               borderRadius: 2,
//               overflow: "hidden",
//               mb: 3,
//               bgcolor: "grey.50",
//             }}
//           >
//             <img
//               src={trend.image}
//               alt={trend.title}
//               style={{
//                 width: "100%",
//                 height: "200px",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>

//           <Typography variant="h6" gutterBottom>
//             {trend.title}
//           </Typography>

//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             {trend.description}
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             <CalendarTodayIcon
//               sx={{ fontSize: 20, color: "text.secondary", mr: 1 }}
//             />
//             <Typography variant="body2" color="text.secondary">
//               {trend.date}
//             </Typography>
//             <Box sx={{ flexGrow: 1 }} />
//             <Chip
//               icon={<TrendingUpIcon />}
//               label={trend.improvement}
//               size="small"
//               color="success"
//               sx={{ borderRadius: 1 }}
//             />
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           <Typography variant="subtitle2" gutterBottom>
//             Key Insights:
//           </Typography>
//           {trend.insights.map((insight, i) => (
//             <Typography
//               key={i}
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 mb: 0.5,
//               }}
//             >
//               • {insight}
//             </Typography>
//           ))}

//           <Button fullWidth variant="outlined" color="primary" sx={{ mt: 2 }}>
//             View Detailed Analysis
//           </Button>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

const Trends = () => {
  const [plots, setPlots] = useState({
    fig1: null,
    fig2: null,
    fig3: null,
    fig4: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://127.0.0.1:8000/trends")
      .then((response) => {
        const { fig1, fig2, fig3, fig4 } = response.data;
        setPlots({
          fig1: JSON.parse(fig1),
          fig2: JSON.parse(fig2),
          fig3: JSON.parse(fig3),
          fig4: JSON.parse(fig4),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Trend Analysis Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore Patterns in Group-Wide Activity and Performance Metrics
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 400, padding: "10px" }}
        >
          Average Activity Metrics Across Weekdays
        </Typography>
        <Plot data={plots.fig1.data} layout={plots.fig1.layout} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 400, padding: "10px" }}
        >
          Correlation Heatmap of Activity Metrics
        </Typography>
        <Plot data={plots.fig2.data} layout={plots.fig2.layout} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 400, padding: "10px" }}
        >
          Calories Burned vs. Total Active Minutes
        </Typography>
        <Plot data={plots.fig3.data} layout={plots.fig3.layout} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 400, padding: "10px" }}
        >
          Activity Trends Over Time
        </Typography>
        <Plot data={plots.fig4.data} layout={plots.fig4.layout} />
      </Box>
    </motion.div>
  );
};

export default Trends;
