import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { PointOfInterest } from "../model/PointOfInterest";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import { IconText } from "./IconText";

interface PoICardProps {
  poi: PointOfInterest;
}

export function PoICard({ poi }: PoICardProps) {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => {
        navigate(`/pois/${poi.id}`);
      }}
      sx={{ textDecoration: "none", cursor: "pointer" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={`Afbeelding van ${poi.name}`}
          height="140"
          image={poi.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {poi.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <IconText>
              <AccessTimeIcon
                className="icon"
                sx={{ color: "green", marginRight: "5px" }}
              />
              <span style={{ color: "green" }}>
                Open! Sluit om {poi.openingHours.closeTime}
              </span>
            </IconText>

            <IconText>
              <AccessTimeIcon
                className="icon"
                sx={{ color: "red", marginRight: "5px" }}
              />
              <p style={{ color: "red" }}>
                Opent om {poi.openingHours.openTime}
              </p>
            </IconText>

            <IconText>
              <PeopleAltIcon className="icon" sx={{ marginRight: "5px" }} />
              <p>Huidige wachttijd: {poi.currentWaitTime} min</p>
            </IconText>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
