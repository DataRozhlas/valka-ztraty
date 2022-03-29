import React from "react";
import Typography from "@mui/material/Typography";

function Legenda({ isMobile }) {
  return (
    <Typography
      variant="caption"
      display="flex"
      sx={{
        justifyContent: "center",
        gap: isMobile ? "1rem" : "2rem",
        flexWrap: "wrap",
        marginTop: isMobile ? "0.5rem" : "1rem",
        marginBottom: isMobile ? "0.5rem" : "1rem",
      }}
    >
      <div>
        <span style={{ color: "#cb181d" }}>{"\u25CF\xa0"}</span>
        <span style={{ color: "#2171b5" }}>{"\u25CF\xa0"}</span>
        <span>{"zničené"}</span>
      </div>
      <div>
        <span style={{ color: "#fb6a4a" }}>{"\u25CF\xa0"}</span>
        <span style={{ color: "#6baed6" }}>{"\u25CF\xa0"}</span>
        <span>{"ukořistěné"}</span>
      </div>
      <div>
        <span style={{ color: "#fcae91" }}>{"\u25CF\xa0"}</span>
        <span style={{ color: "#bdd7e7" }}>{"\u25CF\xa0"}</span>
        <span>{"opuštěné"}</span>
      </div>
      <div>
        <span style={{ color: "#fee5d9" }}>{"\u25CF\xa0"}</span>
        <span style={{ color: "#eff3ff" }}>{"\u25CF\xa0"}</span>
        <span>{"poškozené"}</span>
      </div>
    </Typography>
  );
}

export default Legenda;
