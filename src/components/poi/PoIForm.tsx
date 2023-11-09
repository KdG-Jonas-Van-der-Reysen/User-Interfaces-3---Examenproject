import {
  Box,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Ride, RideData } from "../../model/Ride";
import { usePointOfInterests } from "../../hooks/usePointOfInterests";
import { useNavigate } from "react-router-dom";
import { PointOfInterest } from "../../model/PointOfInterest";
import { usePointOfInterest } from "../../hooks/usePointOfInterest";
import { zodResolver } from "@hookform/resolvers/zod";
import { PoIMapDnD } from "./maps/PoIMapDnD";
import { ErrorSharp } from "@mui/icons-material";

// Define a partial validation schema for the properties that need validation
const poiSchema: z.ZodType<Partial<RideData>> = z.object({
  name: z.string().min(3, "Geef aub een naam van minstens 3 karakters"),
  type: z.enum([
    "attractie",
    "toiletten",
    "restaurant",
    "foodtruck",
    "lockers",
    "winkel",
  ]),
  description: z.string(),
  image: z.string().url("Vul aub een geldige URL in"),
  openingHours: z.object({
    openTime: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Vul aub een geldig uur in (uu:mm)"
      ),
    closeTime: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Vul aub een geldig uur in (uu:mm)"
      ),
  }),
  tagsStr: z.string(),
  currentWaitTime: z.coerce.number(),
  mapDrawingOptions: z.object({
    location: z.object({
      x: z.coerce.number().gte(0, "X moet groter of gelijk aan 0 zijn"),
      y: z.coerce.number().gte(0, "Y moet groter of gelijk aan 0 zijn"),
    }),
    size: z.object({
      width: z.coerce.number(),
      height: z.coerce.number(),
    }),
    hidden: z.boolean(),
  }),
  minLength: z.coerce
    .number()
    .gte(100, "Minimum lengte moet groter of gelijk aan 100 cm zijn"),
  similarRidesStr: z.string(),
  targetAudience: z.enum(["toddlers", "teens", "adults", "all"]),
});

interface PoIFormProps {
  poi?: PointOfInterest | Ride;
}
export function PoIForm({ poi }: PoIFormProps) {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm<RideData>({
    resolver: zodResolver(poiSchema),
    defaultValues: {
      name: poi?.name || "",
      type: poi?.type || "attractie",
      image: poi?.image || "",
      description: poi?.description || "",
      tagsStr: poi ? poi.tags.join(",") : "",
      openingHours: poi?.openingHours || {
        openTime: "10:00",
        closeTime: "20:00",
      },
      currentWaitTime: poi?.currentWaitTime || 0, // in minutes
      mapDrawingOptions: poi?.mapDrawingOptions || {
        location: {
          x: 0,
          y: 0,
        },
        size: {
          width: 15,
          height: 15,
        },
        hidden: false,
      },
      targetAudience: (poi as Ride)?.targetAudience || "all",
      minLength: (poi as Ride)?.minLength || 120,
      similarRidesStr: (poi as Ride)?.similarRides?.join(",") || "",
    },
  });

  const { addPointOfInterest } = usePointOfInterests("");

  const id: string = `${poi?.id || "1"}`;
  const { editPointOfInterest } = usePointOfInterest(id);
  const navigate = useNavigate();

  const watchType = watch("type", poi?.type || "attractie");
  
  const isEdit = !!poi;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("submitting", data);
        if (data.type == "attractie") {
          console.log("adding ride");
          const ride: Omit<Ride, "id"> = {
            ...data,
            tags: data.tagsStr.toLowerCase().split(","),
            similarRides: data.similarRidesStr.split(","),
          };
          console.log("ride", ride);
          if (isEdit) {
            editPointOfInterest(ride);
          } else {
            addPointOfInterest(ride);
          }
        } else {
          console.log("adding poi");
          const poi: Omit<PointOfInterest, "id"> = {
            name: data.name,
            type: data.type,
            image: data.image,
            description: data.description,
            tags: data.tagsStr.toLowerCase().split(","),
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
              hidden: data.mapDrawingOptions.hidden,
            },
          };
          console.log("poi", poi);
          if (isEdit) {
            editPointOfInterest(poi);
          } else {
            addPointOfInterest(poi);
          }
        }
        if (isEdit) {
          navigate(`/pois/${id}`);
        } else {
          navigate("/");
        }
        reset();
      })}
    >
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
          name="tagsStr"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              style={{ display: "block" }}
              label="Tags (door komma gescheiden)"
              error={!!errors.tagsStr}
              helperText={errors.tagsStr?.message}
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
              name="similarRidesStr"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  style={{ display: "block" }}
                  label="Gelijkaardige attractie ID's (door komma gescheiden)"
                  error={!!errors.similarRidesStr}
                  helperText={errors.similarRidesStr?.message}
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

        <FormControlLabel
          sx={{ marginBottom: "-15px" }}
          control={
            <Controller
              name="mapDrawingOptions.hidden"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              )}
            />
          }
          label="Zone reeds op kaart aangeduid?"
        />

        <small style={{ marginBottom: "1rem" }}>
          Hiermee zal er geen icoontje weergegeven worden, maar kun je wel een
          "klikbare zone" instellen
        </small>

        <Controller
          name="mapDrawingOptions"
          control={control}
          render={({ field }) => (
            <Box sx={{overflowX: "auto"}}>
              <PoIMapDnD
              type={watchType}
              name={watch("name")}
              mapDrawingOptions={field.value}
              setMapDrawingOptions={(mapDrawingOptions) => {
                console.log(mapDrawingOptions);
                console.log(typeof mapDrawingOptions.size.width);
                field.onChange(mapDrawingOptions);
              }}
            />
            </Box>
          )}
        />

        {/* Submit */}
        <button type="submit">{poi ? "Opslaan" : "Toevoegen"}</button>
      </Box>
    </form>
  );
}
