/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box, Chip, Link } from "@mui/material";
import { PointOfInterest } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";

// Icons
import AttractionsIcon from "@mui/icons-material/Attractions";
import WcIcon from "@mui/icons-material/Wc";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import KeyIcon from "@mui/icons-material/Key";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";

interface IconMappings {
  [key: string]: React.ReactElement;
}

const iconMappings: IconMappings = {
  attractie: <AttractionsIcon />,
  wc: <WcIcon />,
  restaurant: <RestaurantMenuIcon />,
  foodtruck: <FastfoodIcon />,
  key: <KeyIcon />,
  winkel: <StorefrontIcon />,
  lockers: <KeyIcon />,
};

interface MapDrawingOptions {
  hidden: boolean;
  location: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

interface PoIMapDnDProps {
  type: string;
  name: string;
  mapDrawingOptions: MapDrawingOptions;
  setMapDrawingOptions: (mapDrawingOptions: MapDrawingOptions) => void;
}

export function PoIMapDnD({
  type,
  name,
  mapDrawingOptions,
  setMapDrawingOptions,
}: PoIMapDnDProps) {
  const [state, setState] = useState({
    width: mapDrawingOptions.hidden ? mapDrawingOptions.size.width : 300,
    height: mapDrawingOptions.hidden ? mapDrawingOptions.size.height : 32,
    x: mapDrawingOptions.location.x,
    y: mapDrawingOptions.location.y,
  });

  const handleDragStop = (e: any, d: any) => {
    setState({ ...state, x: d.x, y: d.y });
    setMapDrawingOptions({
      ...mapDrawingOptions,
      location: {
        x: d.x,
        y: d.y,
      },
    });
  };

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any
  ) => {
    setState({
      ...state,
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
    setMapDrawingOptions({
      ...mapDrawingOptions,
      size: {
        width: Number(ref.style.width.replace("px", "")),
        height: Number(ref.style.height.replace("px", "")),
      },
      location: {
        x: position.x,
        y: position.y,
      },
    });
  };

  return (
    <Box
      sx={{
        width: "800px", // Fixed width for the container
        height: "587px", // Fixed height for the container
        overflowX: "auto", // Enable horizontal scrolling if needed
        overflowY: "hidden",
        position: "relative",
      }}
      className="floorplan-container"
    >
      <Box className="floorplan-wrapper">
        <img
          src="/src/assets/img/walibi_map.jpg"
          alt="Floorplan"
          style={{
            width: "100%", // Make the image width 100% of its parent container
            height: "auto", // Maintain aspect ratio
            borderRadius: "10px",
          }}
          className="floorplan-image"
        />
        <Rnd
          size={{ width: state.width, height: state.height }}
          position={{ x: state.x, y: state.y }}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          enableResizing={mapDrawingOptions.hidden}
        >
          {mapDrawingOptions.hidden ? (
            <Box sx={{ width: "100%", height: "100%", border: "3px solid red", borderRadius: "10px"}} />
          ) : (
            <Chip
              icon={iconMappings[type]}
              label={name}
              variant="filled"
              color="primary"
            />
          )}
        </Rnd>
      </Box>
    </Box>
  );
}
