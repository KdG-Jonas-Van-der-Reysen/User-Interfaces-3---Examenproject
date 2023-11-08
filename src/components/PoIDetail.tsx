import { Box, Chip, Fab, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { usePointOfInterest } from "../hooks/usePointOfInterest";
import { Breacrumbs } from "./navigation/Breacrumbs";
import { Ride } from "../model/Ride";
import { PoIMap } from "./PoIMap";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// Icons
import CreateIcon from '@mui/icons-material/Create';

export function PoIDetail() {
  const { id } = useParams();
  const { isLoading, isError, pointOfInterest: poi } = usePointOfInterest(id!);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Styles
  const makeButtonFloat = {
    margin: 0,
    right: 20,
    bottom: 20,
    position: "fixed",
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!poi) return <p>Geen attractie gevonden</p>;

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const targetAudienceTranslations: {
    toddlers: string;
    teens: string;
    adults: string;
    all: string;
  } = {
    toddlers: "Kleuters",
    teens: "Tieners",
    adults: "Volwassenen",
    all: "Alle leeftijden",
  };

  return (
    <div>
      <Breacrumbs
        currentPageTitle={`${poi.name} (${capitalizeFirstLetter(poi.type)})`}
      />
      <Box sx={{ marginTop: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{
                height: "auto",
                width: "100%",
                borderRadius: "10px",
              }}
              alt="The house from the offer."
              src={poi.image}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">{poi.name}</Typography>

            {poi.tags.length > 0 && (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                {poi.tags.map((tag) => (
                  <Chip size="small" label={tag} />
                ))}
              </Box>
            )}

            <Box sx={{ marginTop: "1rem" }}>
              {poi.type === "attractie" && (
                <Box>
                  <span style={{ fontWeight: "500", display: "block" }}>
                    Doelgroep:
                    {" " +
                      targetAudienceTranslations[
                        (poi as Ride)
                          .targetAudience as keyof typeof targetAudienceTranslations
                      ]}
                  </span>

                  <span style={{ fontWeight: "500", display: "block" }}>
                    Minimum lengte:{" " + (poi as Ride).minLength}cm
                  </span>
                </Box>
              )}
              <span style={{ fontWeight: "500", display: "block" }}>
                Huidige wachttijd:{" " + poi.currentWaitTime + " "} min
              </span>

              <span style={{ fontWeight: "500", display: "block" }}>
                Openingsuren: {poi.openingHours.openTime} -{" "}
                {poi.openingHours.closeTime}
              </span>
            </Box>

            <p>{poi.description}</p>

            <p></p>
          </Grid>
        </Grid>

        <PoIMap pois={[poi]} />
        {!!user && user.isAdmin && (
          <Fab
            variant="extended"
            sx={makeButtonFloat}
            onClick={() => navigate(`/pois/${poi.id}/edit`)}
          >
            <CreateIcon sx={{ mr: 1 }} />
            Bewerken
          </Fab>
        )}
      </Box>
    </div>
  );
}
