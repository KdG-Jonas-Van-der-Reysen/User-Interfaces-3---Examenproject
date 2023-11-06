import axios from "axios";
import { PointOfInterest } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";

export async function getRides() {
  const points = await axios.get<(PointOfInterest | Ride)[]>(
    "/pointOfInterests"
  );
  return points.data;
}

export async function createRide(poiOrRide: Omit<PointOfInterest, "id">) {
  if (poiOrRide.type !== "attractie") {
    console.log("I AM NOT A RIDE");
    const poi: Omit<PointOfInterest, "id"> = {
      name: poiOrRide.name,
      type: poiOrRide.type,
      image: poiOrRide.image,
      description: poiOrRide.description,
      tags: poiOrRide.tags,
      openingHours: poiOrRide.openingHours,
      currentWaitTime: poiOrRide.currentWaitTime,
      mapDrawingOptions: poiOrRide.mapDrawingOptions,
    };

    console.log("POI", poi);
    return axios.post<PointOfInterest | Ride>(`/pointOfInterests`, poi);
  } else {
    return axios.post<PointOfInterest | Ride>(`/pointOfInterests`, poiOrRide);
  }
  
}
