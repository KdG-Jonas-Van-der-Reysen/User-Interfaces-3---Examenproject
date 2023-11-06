import { Grid } from "@mui/material";
import { PointOfInterest } from "../model/PointOfInterest";
import { PoICard } from "./PoICard";
import { Ride } from "../model/Ride";

export function PoICards({ pois }: { pois: (PointOfInterest | Ride)[] }) {
  return (
    <Grid container spacing={2} sx={{ paddingTop: "2rem" }}>
      {pois?.map((poi) => (
        <Grid key={poi.id} item xs={12} sm={4} md={3}>
          <PoICard poi={poi} />
        </Grid>
      ))}
    </Grid>
  );
}
