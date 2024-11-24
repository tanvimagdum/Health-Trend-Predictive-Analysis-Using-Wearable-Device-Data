import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Logo({ variant = "default" }) {
  const navigate = useNavigate();
  const isWhite = variant === "white";
  const isLarge = variant === "large";

  // Custom colors for the logo
  const logoColors = {
    heart: isWhite ? "#FFFFFF" : "#8BF56E", // Vibrant red for heart
    lens: isWhite ? "#FFFFFF" : "#8DE8F2", // Deep blue for lens
    text: isWhite ? "#FFFFFF" : "#1A237E", // Dark blue for text
  };

  return (
    <Box
      onClick={() => navigate("/")}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        "&:hover": {
          "& .logo-heart": {
            transform: "scale(1.1)",
          },
          "& .logo-lens": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: isLarge ? 50 : 40,
          width: isLarge ? 60 : 48,
        }}
      >
        <FavoriteIcon
          className="logo-heart"
          sx={{
            fontSize: isLarge ? 40 : 32,
            position: "relative",
            zIndex: 1,
            color: logoColors.heart,
            transition: "transform 0.3s ease",
          }}
        />
        <VisibilityIcon
          className="logo-lens"
          sx={{
            fontSize: isLarge ? 32 : 24,
            position: "absolute",
            right: -10,
            bottom: 10,
            color: logoColors.lens,
            opacity: 0.9,
            transition: "transform 0.3s ease",
          }}
        />
      </Box>
      <Typography
        variant={isLarge ? "h4" : "h6"}
        component="div"
        sx={{
          fontWeight: 800,
          paddingLeft: "10px",
          color: logoColors.text,
          letterSpacing: "-0.5px",
          "& span": {
            color: logoColors.lens,
          },
        }}
      >
        Cardio<span>Lens</span>
      </Typography>
    </Box>
  );
}

export default Logo;
