import React from "react";
import { AppBar, Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  // Simple Logo component inline
  const Logo = () => (
    <Box
      onClick={() => navigate("/")}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <FavoriteIcon
          sx={{
            fontSize: 32,
            color: "white",
            position: "relative",
            zIndex: 1,
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.5px",
          "& span": {
            color: "#8DE8F2",
          },
        }}
      >
        Cardio<span>Lens</span>
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ mb: 4 }}>
      <AppBar position="static">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ mr: 4 }}>
            <Logo />
          </Box>
          <Tabs
            value={location.pathname}
            onChange={handleChange}
            sx={{
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.7)",
                "&.Mui-selected": {
                  color: "white",
                },
              },
            }}
          >
            <Tab label="Heart Rate Analysis" value="/heart-rate" />
            <Tab label="Trends" value="/trends" />
            <Tab label="Sleep Analysis" value="/sleep" />
          </Tabs>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Navigation;
