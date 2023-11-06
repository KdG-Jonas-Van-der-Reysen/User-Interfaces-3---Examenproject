import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { PointOfInterest } from "../model/PointOfInterest";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface PoICardProps {
  poi: PointOfInterest;
}

export function PoICard({ poi }: PoICardProps) {
  return (
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "30px",
              margin: "0px 0 0px 0",
            }}
          >
            <AccessTimeIcon
              className="icon"
              sx={{ color: "green", marginRight: "5px" }}
            />
            <span style={{ color: "green" }}>
              Open! Sluit om {poi.openingHours.closeTime}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "30px",
            }}
          >
            <AccessTimeIcon
              className="icon"
              sx={{ color: "red", marginRight: "5px" }}
            />
            <p style={{ color: "red" }}>
              Opent om {poi.openingHours.openTime}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "30px",
            }}
          >
            <PeopleAltIcon
              className="icon"
              sx={{ marginRight: "5px" }}
            />
            <p>
              Huidige wachttijd: {poi.currentWaitTime} min
            </p>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}
