import {
  Autocomplete,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { TimeField } from "@mui/x-date-pickers/TimeField";

import { Controller, useForm } from "react-hook-form";
import { RideData } from "../model/Ride";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function AddPoI() {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm<RideData>({
    //resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      type: "attractie",
      image: "",
      description: "",
      tags: "",
      openingHours: {
        openTime: "10:00",
        closeTime: "20:00",
      },
      currentWaitTime: 0, // in minutes
      mapDrawingOptions: {
        location: {
          x: 0,
          y: 0,
        },
        size: {
          width: 15,
          height: 15,
        },
      },
      targetAudience: "all",
      minLength: 120,
      similarRides: "",
    },
  });

  const watchType = watch("type", "attractie");

  return (
    <div style={{ marginBottom: "100px" }}>
      <Typography variant="h6">Point of Interest toevoegen</Typography>
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontWeight: "bold", marginBottom: 0 }}>
            Algemene informatie
          </p>

          {/* Type*/}
          <InputLabel id="poi-type-label">Type</InputLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="poi-type-label"
                style={{ display: "block" }}
                label="Type"
                fullWidth
              >
                <MenuItem value="attractie">Attractie</MenuItem>
                <MenuItem value="toiletten">Toiletten</MenuItem>
                <MenuItem value="restaurant">Restaurant</MenuItem>
                <MenuItem value="foodtruck">Foodtruck</MenuItem>
                <MenuItem value="lockers">Lockers</MenuItem>
                <MenuItem value="winkel">Winkel</MenuItem>
              </Select>
            )}
          />
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                style={{ display: "block" }}
                label="Naam"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                style={{ display: "block" }}
                label="Beschrijving"
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />

          {/* Tags */}
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                style={{ display: "block" }}
                label="Tags (door komma gescheiden)"
                error={!!errors.tags}
                helperText={errors.tags?.message}
                fullWidth
              />
            )}
          />

          {/* Current wait time */}
          <Controller
            name="currentWaitTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                style={{ display: "block" }}
                label="Huidige wachttijd in minuten"
                error={!!errors.currentWaitTime}
                helperText={errors.currentWaitTime?.message}
                fullWidth
              />
            )}
          />

          {/* Audience */}
          {watchType == "attractie" && (
            <div>
              <p style={{ fontWeight: "bold" }}>Doelgroep</p>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="targetAudience"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ display: "block" }}
                        labelId="audienceType-label"
                        label="Voor wie is de attractie bedoeld?"
                        fullWidth
                      >
                        <MenuItem value="toddlers">Kleuters</MenuItem>
                        <MenuItem value="teens">Tieners</MenuItem>
                        <MenuItem value="adults">Volwassenen</MenuItem>
                        <MenuItem value="all">Iedereen</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="minLength"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputProps={{ inputMode: "numeric" }}
                        style={{ display: "block" }}
                        label="Minimum lengte (in cm)"
                        error={!!errors.minLength}
                        helperText={errors.minLength?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </div>
          )}

          {/* Similar rides */}
          {watchType == "attractie" && (
            <div>
              <p style={{ fontWeight: "bold" }}>Gelijkaardige attracties</p>

              <Controller
                name="similarRides"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    style={{ display: "block" }}
                    label="Gelijkaardige attractie ID's (door komma gescheiden)"
                    error={!!errors.similarRides}
                    helperText={errors.similarRides?.message}
                    fullWidth
                  />
                )}
              />
            </div>
          )}

          {/* Opening hours, openTime & closeTime in row next to eachother */}
          <p style={{ fontWeight: "bold" }}>Openingsuren</p>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Controller
              name="openingHours.openTime"
              control={control}
              render={({ field }) => (
                <TimeField
                  {...field}
                  style={{ display: "block" }}
                  label="Openingsuur"
                  format="hh:mm"
                  helperText={errors.openingHours?.openTime?.message}
                />
              )}
            />
            <Controller
              name="openingHours.closeTime"
              control={control}
              render={({ field }) => (
                <TimeField
                  {...field}
                  style={{ display: "block" }}
                  label="Sluitingsuur"
                  format="hh:mm"
                  helperText={errors.openingHours?.closeTime?.message}
                />
              )}
            />
          </Box>

          <p style={{ fontWeight: "bold", marginBottom: 0 }}>Kaartinfo</p>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginBottom: "15px" }}>Locatie</InputLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="mapDrawingOptions.location.x"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{ display: "block" }}
                      label="X"
                      error={!!errors.mapDrawingOptions?.location?.x}
                      helperText={
                        errors.mapDrawingOptions?.location?.x?.message
                      }
                    />
                  )}
                />
                <Controller
                  name="mapDrawingOptions.location.y"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{ display: "block" }}
                      label="Y"
                      error={!!errors.mapDrawingOptions?.location?.y}
                      helperText={
                        errors.mapDrawingOptions?.location?.y?.message
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginBottom: "16px" }}>Afmetingen</InputLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="mapDrawingOptions.size.width"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{ display: "block" }}
                      label="Breedte"
                      error={!!errors.mapDrawingOptions?.size?.width}
                      helperText={
                        errors.mapDrawingOptions?.size?.width?.message
                      }
                    />
                  )}
                />
                <Controller
                  name="mapDrawingOptions.size.height"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{ display: "block" }}
                      label="Hoogte"
                      error={!!errors.mapDrawingOptions?.size?.height}
                      helperText={
                        errors.mapDrawingOptions?.size?.height?.message
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
