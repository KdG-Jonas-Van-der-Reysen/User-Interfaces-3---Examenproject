import {
  Typography,
} from "@mui/material";

import { Breacrumbs } from "./navigation/Breacrumbs";
import { PoIForm } from "./PoIForm";
import { usePointOfInterest } from "../hooks/usePointOfInterest";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export function PoIEdit() {
  const { id } = useParams();
  const { isLoading, isError, pointOfInterest: poi } = usePointOfInterest(id!);
  const { user } = useContext(AuthContext);

  if(!user || !user.isAdmin) {
    return <Typography variant="h6">Je hebt geen toegang tot deze pagina.</Typography>
  }

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Error</p>
  if(!poi) return <p>Geen attractie gevonden</p>

  return (
    <div style={{ marginBottom: "100px" }}>
      <Breacrumbs currentPageTitle="Toevoegen" inBetweenLink={{title: poi.name, path: `/pois/${poi.id}`}} />

      <Typography variant="h6">{poi.name} bewerken</Typography>
      <PoIForm poi={poi} />
    </div>
  );
}
