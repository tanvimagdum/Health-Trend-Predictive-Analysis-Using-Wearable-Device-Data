import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Logo({ variant = "default" }) {
  const navigate = useNavigate();
  const isWhite = variant === "white";
  const isLarge = variant === "large";

  // Custom colors for the logo
  const logoColors = {
    heart: isWhite ? "#FFFFFF" : "#8BF56E", // Vibrant red for heart
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
      </Box>
      <Typography
        variant={isLarge ? "h4" : "h6"}
        component="div"
        sx={{
          fontWeight: 800,
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
