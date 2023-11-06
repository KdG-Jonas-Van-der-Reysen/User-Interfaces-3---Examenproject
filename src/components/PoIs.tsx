import {
  Box,
  Fab,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MapListViewSwitch } from "./form/MapSwitch";
import { PoICards } from "./PoICards";
// Icons
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import { useRides } from "../hooks/useRides";
import { useState } from "react";

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

  const [search, setSearch] = useState("");

  // Data
  const { isLoading, isError, rides } = useRides();
  const filteredRides = rides?.filter((ride) =>
    ride.name.toLowerCase().includes(search.toLowerCase())
  );

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

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">Zoeken & filteren</Typography>
          <TextField
            sx={{ marginTop: "1rem" }}
            id="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            placeholder="Zoek een attractie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={9}>
          <PoICards pois={filteredRides!} />
        </Grid>
      </Grid>

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
