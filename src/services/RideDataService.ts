import { PoIType } from "./../model/PointOfInterest";
import axios from "axios";
import { PointOfInterest } from "../model/PointOfInterest";
import { Ride, RideData } from "../model/Ride";

export async function getRides() {
  const points = await axios.get<(PointOfInterest | Ride)[]>(
    "/pointOfInterests"
  );
  return points.data;
}

export async function createRide(ride: RideData) {
  if (ride.type == "attractie") {
    const newRide: Omit<Ride, "id"> = {
      ...ride,
      tags: ride.tags.split(","),
      similarRides: ride.tags.split(","),
    };
    return axios.post<PointOfInterest | Ride>(`/pointOfInterests`, newRide);
  } else {
    const newPoint: Omit<PointOfInterest, "id"> = {
      ...ride,
      tags: ride.tags.split(","),
    };
    return axios.post<PointOfInterest | Ride>(`/pointOfInterests`, newPoint);
  }
}
