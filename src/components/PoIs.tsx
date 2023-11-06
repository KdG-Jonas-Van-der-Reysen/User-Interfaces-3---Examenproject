import { Box, Fab, Typography } from "@mui/material";
import { MapListViewSwitch } from "./form/MapSwitch";

// Icons
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useRides } from "../hooks/useRides";

function Item({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function PoIs() {
  // Styles
  const makeButtonFloat = {
    margin: 0,
    right: 20,
    bottom: 20,
    position: "fixed",
  };

  const navigate = useNavigate();

  // Data
  const { isLoading, isError, rides } = useRides();

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Ontdek ons park!</Typography>
        <MapListViewSwitch />
      </Box>
      <Typography variant="h6">
        Ervaar Walibi: Adrenaline en Plezier in één! 🎢🌟
      </Typography>
      <p>
        Walibi staat bekend om zijn sensationele attracties. Ben jij een echte
        thrill-seeker of geef je de voorkeur aan een rustiger avontuur? De keuze
        is helemaal aan jou. Op warme dagen kun je ook verkoeling vinden in onze
        verfrissende waterattracties. Veel plezier!
      </p>

      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Error!</p> : null}
      {rides?.map((ride) => (
        <p key={ride.id}>{ride.name}</p>
      ))}

      <Fab
        variant="extended"
        sx={makeButtonFloat}
        onClick={() => navigate("/pois/add")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Toevoegen
      </Fab>
    </div>
  );
}
