import { Box, Chip, Link } from "@mui/material";
import { PointOfInterest } from "../../../model/PointOfInterest";
import { Ride } from "../../../model/Ride";

// Icons
import AttractionsIcon from "@mui/icons-material/Attractions";
import WcIcon from "@mui/icons-material/Wc";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import KeyIcon from "@mui/icons-material/Key";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";

const iconMappings: { [key: string]: React.ReactElement } = {
  attractie: <AttractionsIcon />,
  wc: <WcIcon />,
  restaurant: <RestaurantMenuIcon />,
  foodtruck: <FastfoodIcon />,
  key: <KeyIcon />,
  winkel: <StorefrontIcon />,
  lockers: <KeyIcon />,
};

interface PoIMapProps {
  pois: (PointOfInterest | Ride)[];
  clickable?: boolean;
}
export function PoIMap({ pois, clickable }: PoIMapProps) {
  const navigate = useNavigate();
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
        {pois.map((poi) => (
          <div
            style={{
              position: "absolute",
              top: `${poi.mapDrawingOptions.location.y}px`,
              left: `${poi.mapDrawingOptions.location.x}px`,
              minWidth: `${poi.mapDrawingOptions.size.width}px`,
              minHeight: `${poi.mapDrawingOptions.size.height}px`,
            }}
            key={poi.id}
          >
            {clickable &&
              !poi.mapDrawingOptions.hidden &&
              iconMappings[poi.type] && (
                <Link
                  onClick={() => {
                    navigate(`/pois/${poi.id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Chip
                    icon={iconMappings[poi.type]}
                    label={poi.name}
                    variant="filled"
                    color="primary"
                  />
                </Link>
              )}

            {clickable &&
              poi.mapDrawingOptions.hidden && (
                <Link
                  onClick={() => {
                    navigate(`/pois/${poi.id}`);
                  }}
                  sx={{ cursor: "pointer", width:'100%', height:'100%', position:'absolute', top:0, left:0}}
                >
                </Link>
              )}

            {!clickable && iconMappings[poi.type] && (
              <Chip
                icon={iconMappings[poi.type]}
                label={poi.name}
                variant="filled"
                color="primary"
              />
            )}
          </div>
        ))}
      </Box>
    </Box>
  );
}
