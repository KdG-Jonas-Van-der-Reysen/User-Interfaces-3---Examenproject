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
import { Ride, RideData } from "../model/Ride";
import { useRides } from "../hooks/useRides";
import { useNavigate } from "react-router-dom";
import { PointOfInterest } from "../model/PointOfInterest";


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

  const { addRide } = useRides();
  const navigate = useNavigate();

  const watchType = watch("type", "attractie");
  const watchOpenTime = watch("openingHours.openTime", "10:00");

  return (
    <div style={{ marginBottom: "100px" }}>
      <Typography variant="h6">Point of Interest toevoegen</Typography>
      <form
        onSubmit={handleSubmit((data) => {
          if(data.type == "attractie") {
            const ride :Omit<Ride, "id"> = {
              ...data,
              tags: data.tags.split(","),
              similarRides: data.similarRides.split(","),
            }
            addRide(ride);
          } else {
            const poi :Omit<PointOfInterest, "id"> = {
              name: data.name,
              type: data.type,
              image: data.image,
              description: data.description,
              tags: data.tags.split(","),
              openingHours: {
                openTime: data.openingHours.openTime,
                closeTime: data.openingHours.closeTime,
              },
              currentWaitTime: data.currentWaitTime,
              mapDrawingOptions: {
                location: {
                  x: data.mapDrawingOptions.location.x,
                  y: data.mapDrawingOptions.location.y,
                },
                size: {
                  width: data.mapDrawingOptions.size.width,
                  height: data.mapDrawingOptions.size.height,
                },
              },
              
            }
            addRide(poi);
          }
          addRide(data);
          navigate("/");
          reset();
        })}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontWeight: "bold", marginBottom: 0 }}>
            Algemene informatie {watchOpenTime}
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

          {/* Image */}
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                style={{ display: "block" }}
                label="Afbeelding"
                error={!!errors.image}
                helperText={errors.image?.message}
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
                <TextField
                  {...field}
                  label="Openingsuur"
                  error={!!errors.openingHours?.openTime}
                  helperText={errors.openingHours?.openTime?.message}
                />
              )}
            />
            <Controller
              name="openingHours.closeTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sluitingsuur"
                  error={!!errors.openingHours?.closeTime}
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

          {/* Submit */}
          <button
            type="submit"
          >
            Toevoegen
          </button>
        </Box>
      </form>
    </div>
  );
}
