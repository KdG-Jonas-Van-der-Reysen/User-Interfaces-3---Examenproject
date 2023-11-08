import { Box, Breadcrumbs, Chip, Grid, Link, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { usePointOfInterest } from "../hooks/usePointOfInterest";
import { Breacrumbs } from "./navigation/Breacrumbs";
import { IconText } from "./IconText";
import { Ride } from "../model/Ride";
import { PoIMap } from "./PoIMap";

export function PoiDetail() {
  const { id } = useParams();
  const { isLoading, isError, pointOfInterest: poi } = usePointOfInterest(id!);

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

        <PoIMap pois={[poi]}/>
      </Box>
    </div>
  );
}
