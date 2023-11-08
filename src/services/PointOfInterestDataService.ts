import axios from "axios";
import { PointOfInterest } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";

export async function getPointOfInterests() {
  const points = await axios.get<(PointOfInterest | Ride)[]>(
    "/pointOfInterests"
  );
  return points.data;
}

export async function getPointOfInterest(id: string) {
  const point = await axios.get<PointOfInterest | Ride>("/pointOfInterests/" + id);
  return point.data;
}

export async function createPointOfInterest(poiOrRide: Omit<PointOfInterest, "id">) {
  if (poiOrRide.type !== "attractie") {
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

export async function updatePointOfInterest(id:string, poiOrRide: Omit<PointOfInterest, "id">) {
  if (poiOrRide.type !== "attractie") {
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

    return axios.put<PointOfInterest | Ride>(`/pointOfInterests/${id}`, poi);
  } else {
    return axios.put<PointOfInterest | Ride>(`/pointOfInterests/${id}`, poiOrRide);
  }
}

export async function deletePointOfInterest(id: string) {
  return axios.delete(`/pointOfInterests/${id}`);
}