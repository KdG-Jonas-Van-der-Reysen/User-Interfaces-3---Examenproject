import {
  Box,
  Divider,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
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
import { PointOfInterest } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";

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
  const [typeFilter, setTypeFilter] = useState("all");
  const [audienceFilter, setAudienceFilter] = useState("all");

  // Data
  const { isLoading, isError, rides } = useRides();

  // Filtering
  let filteredPois: (PointOfInterest | Ride)[] = [];

  if (!isLoading && !isError && rides) {
    filteredPois = rides
      // Filter for search
      .filter((poi) => poi.name.toLowerCase().includes(search.toLowerCase()))
      // Filter for type
      .filter((poi) => typeFilter == "all" || poi.type == typeFilter)
      // Filter for audience
   
  }

  if (typeFilter !== "all")
    filteredPois = filteredPois?.filter((ride) => ride.type === typeFilter);

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingRight: "1rem",
            }}
          >
            <Typography variant="h6">Zoeken & filteren</Typography>

            {/* Search*/}
            <TextField
              fullWidth
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

            {/* Filter on type */}
            <FormControl fullWidth sx={{ marginTop: "2rem" }}>
              <InputLabel id="poi-type-filter">
                Wat voor iets zoek je?
              </InputLabel>
              <Select
                labelId="poi-type-filter"
                id="demo-simple-select"
                value={typeFilter}
                label="POI type filter"
                size="small"
                onChange={(e) => setTypeFilter(e.target.value as string)}
              >
                <MenuItem value="all">Alles</MenuItem>
                <MenuItem value="attractie">Attractie</MenuItem>
                <MenuItem value="toiletten">Toiletten</MenuItem>
                <MenuItem value="restaurant">Restaurant</MenuItem>
                <MenuItem value="foodtruck">Foodtruck</MenuItem>
                <MenuItem value="lockers">Lockers</MenuItem>
                <MenuItem value="winkel">Winkel</MenuItem>
              </Select>
            </FormControl>

            {/* Filter on audience */}
            <FormControl fullWidth sx={{ marginTop: "2rem" }}>
              <InputLabel id="poi-type-filter">
                Wat voor iets zoek je?
              </InputLabel>
              <Select
                labelId="poi-type-filter"
                id="demo-simple-select"
                value={audienceFilter}
                label="POI type filter"
                size="small"
                onChange={(e) => setAudienceFilter(e.target.value as string)}
              >
                <MenuItem value="all">Alles</MenuItem>
                <MenuItem value="toddlers">Kleuters</MenuItem>
                <MenuItem value="teens">Tieners</MenuItem>
                <MenuItem value="adults">Volwassenen</MenuItem>
                <MenuItem value="all">Iedereen</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <PoICards pois={filteredPois!} />
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
