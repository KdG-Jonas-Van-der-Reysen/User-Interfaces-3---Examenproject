import {
  Box,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { MapListViewSwitch } from "./form/MapSwitch";
import { PoICards } from "./poi/PoICards";

import { useNavigate } from "react-router-dom";
import { usePointOfInterests } from "../hooks/usePointOfInterests";
import { useContext, useState } from "react";
import { PointOfInterest } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";
import { PoIMap } from "./poi/maps/PoIMap";
import AuthContext from "../contexts/AuthContext";
import queryString from "query-string";
import { isPoIOpen } from "../model/PointOfInterest";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LabelIcon from "@mui/icons-material/Label";

export function PoIs() {
  const { user } = useContext(AuthContext);

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
  const [minLengthFilter, setMinLengthFilter] = useState(100);
  const [maxWaitTimeFilter, setMaxWaitTimeFilter] = useState(120);
  const [openClosedFilter, setOpenClosedFilter] = useState("all");
  const [tagsFilter, setTagsFilter] = useState("");
  const [showMap, setShowMap] = useState(false);

  // Build query object
  const query: Record<string, string> = {};

  if (search !== "") query.name_like = search;
  if (typeFilter !== "all") query.type = typeFilter;
  if (audienceFilter !== "all") query.audience = audienceFilter;
  query.currentWaitTime_lte = maxWaitTimeFilter.toString();

  console.log(queryString.stringify(query));

  // Data
  const {
    isLoading,
    isError,
    pointOfInterests: pointOfInterests,
  } = usePointOfInterests(queryString.stringify(query));

  // Filtering
  let filteredPois: (PointOfInterest | Ride)[] = [];

  if (!isLoading && !isError && pointOfInterests) {
    filteredPois = pointOfInterests
      .filter(
        (poi) =>
          audienceFilter == "all" ||
          poi.type != "attractie" ||
          (poi.type == "attractie" &&
            (poi as Ride).targetAudience == audienceFilter)
      )
      .filter(
        (poi) =>
          poi.type != "attractie" ||
          (poi.type == "attractie" &&
            (poi as Ride).minLength >= minLengthFilter)
      )
      .filter(
        (poi) =>
          openClosedFilter === "all" ||
          (openClosedFilter === "open" && isPoIOpen(poi) === 0) ||
          (openClosedFilter === "closed" && isPoIOpen(poi) !== 1)
      )
      .filter(
        (poi) =>
          tagsFilter === "" || poi.tags.includes(tagsFilter.toLowerCase())
      );
  }
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Ontdek ons park!</Typography>
        <MapListViewSwitch showMap={showMap} setShowMap={setShowMap} />
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

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
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

            {/* Tags*/}
            <TextField
              fullWidth
              sx={{ marginTop: "1rem" }}
              id="tags"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              placeholder="Zoek op tags"
              value={tagsFilter}
              onChange={(e) => setTagsFilter(e.target.value)}
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

            {/* Filter on audience & minLength */}
            {(typeFilter == "attractie" || typeFilter == "all") && (
              <Box>
                <FormControl fullWidth sx={{ marginTop: "2rem" }}>
                  <InputLabel id="poi-type-filter">Voor wie?</InputLabel>
                  <Select
                    labelId="poi-type-filter"
                    id="demo-simple-select"
                    value={audienceFilter}
                    label="POI type filter"
                    size="small"
                    onChange={(e) =>
                      setAudienceFilter(e.target.value as string)
                    }
                  >
                    <MenuItem value="all">Alles</MenuItem>
                    <MenuItem value="toddlers">Kleuters</MenuItem>
                    <MenuItem value="teens">Tieners</MenuItem>
                    <MenuItem value="adults">Volwassenen</MenuItem>
                    <MenuItem value="all">Iedereen</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="body2" sx={{ marginTop: "2rem" }}>
                  Minimum lengte: {minLengthFilter}cm
                </Typography>
                <Slider
                  aria-label="Min length"
                  getAriaValueText={() =>
                    minLengthFilter.toString() + " centimeter"
                  }
                  valueLabelDisplay="auto"
                  step={1}
                  min={100}
                  max={200}
                  onChange={(_e, value) => setMinLengthFilter(value as number)}
                  sx={{
                    marginTop: "0.5rem",
                    width: "calc(100% - 10px)",
                    left: "10px",
                  }}
                />
              </Box>
            )}

            {/* Max wait time*/}
            <Typography variant="body2" sx={{ marginTop: "2rem" }}>
              Maximum wachttijd:
            </Typography>
            <TextField
              fullWidth
              type="number"
              sx={{ marginTop: "1rem" }}
              id="maxWaitTime"
              InputProps={{
                inputProps: { min: 0, max: 10 },
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              variant="standard"
              placeholder="Zoek een attractie"
              value={maxWaitTimeFilter}
              onChange={(e) => setMaxWaitTimeFilter(Number(e.target.value))}
            />

            {/* Filter on open / closed */}
            <FormControl fullWidth sx={{ marginTop: "2rem" }}>
              <InputLabel id="poi-open-closed-filter">
                Momenteel open of gesloten?
              </InputLabel>
              <Select
                labelId="poi-open-closed-filter"
                value={openClosedFilter}
                label="Momenteel open of gesloten?"
                size="small"
                onChange={(e) => setOpenClosedFilter(e.target.value as string)}
              >
                <MenuItem value="all">Alles</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Gesloten</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {!isLoading && !isError && (
          <Grid item xs={12} sm={8} md={9} sx={{overflowX: 'auto'}}>
            {showMap ? (
              <PoIMap pois={filteredPois!} clickable={true} />
            ) : (
              <PoICards pois={filteredPois!} />
            )}
          </Grid>
        )}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Er is iets misgelopen... Probeer het later opnieuw.</p>}
      </Grid>

      {!!user && user.isAdmin && (
        <Fab
          variant="extended"
          sx={makeButtonFloat}
          onClick={() => navigate("/pois/add")}
        >
          <AddIcon sx={{ mr: 1 }} />
          Toevoegen
        </Fab>
      )}
    </div>
  );
}
