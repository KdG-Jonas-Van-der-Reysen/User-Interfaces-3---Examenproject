import { Box, Chip, Fab, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { usePointOfInterest } from "../../hooks/usePointOfInterest";
import { Breacrumbs } from "../navigation/Breacrumbs";
import { Ride } from "../../model/Ride";
import { PoIMap } from "./maps/PoIMap";
import { useContext } from "react";
import { isPoIOpen } from "../../model/PointOfInterest";
import AuthContext from "../../contexts/AuthContext";

// Icons
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export function PoIDetail() {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    pointOfInterest: poi,
    removePointOfInterest,
  } = usePointOfInterest(id!);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let open = false;
  if (poi) {
    open = isPoIOpen(poi) === 0;
  }

  // Styles
  const makeFirstButtonFloat = {
    margin: 0,
    right: 90,
    bottom: 20,
    position: "fixed",
  };

  const makeSecondButtonFloat = {
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

  function removePoi() {
    Swal.fire({
      title: `Ben je zeker dat je ${
        poi?.name || "deze poi "
      } wilt verwijderen?`,
      text: "Je kan deze actie niet ongedaan maken!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Verwijderen",
      cancelButtonText: "Annuleren",
    }).then((result) => {
      if (result.isConfirmed && removePointOfInterest) {
        removePointOfInterest();
        navigate("/");
      }
    });
  }

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
                {open ? (
                  <Chip size="small" label="Open" color="success" />
                ) : (
                  <Chip size="small" label="Gesloten" color="error" />
                )}
                {poi.tags.map((tag) => (
                  <Chip key={tag} size="small" label={tag} />
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

        <Box sx={{overflowX: "auto"}}>
          <PoIMap pois={[poi]} />
        </Box>
        {!!user && user.isAdmin && (
          <div>
            <Fab
              color="info"
              aria-label="add"
              sx={makeFirstButtonFloat}
              onClick={() => navigate(`/pois/${poi.id}/edit`)}
            >
              <CreateIcon />
            </Fab>
            <Fab
              color="error"
              aria-label="add"
              sx={makeSecondButtonFloat}
              onClick={removePoi}
            >
              <DeleteIcon />
            </Fab>
          </div>
        )}
      </Box>
    </div>
  );
}
