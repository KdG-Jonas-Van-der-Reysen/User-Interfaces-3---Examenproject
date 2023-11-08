import { Ride } from "./Ride";

export interface PointOfInterest {
  id: number;
  name: string; // Text, min 3 characters
  type: PoIType;
  image: string; // URL
  description: string; // max 500 chars
  tags: string[];
  openingHours: {
    openTime: string; // HH:mm
    closeTime: string; // HH:mm
  };
  currentWaitTime: number; // in minutes
  mapDrawingOptions: {
    location: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
}

export function isPoIOpen(poi: PointOfInterest | Ride): number {
  const openTime = poi.openingHours.openTime;
  const closeTime = poi.openingHours.closeTime;
  const now = new Date();

  // Convert to current date
  const openDate = new Date();
  openDate.setHours(parseInt(openTime.split(":")[0]));
  openDate.setMinutes(parseInt(openTime.split(":")[1]));

  const closeDate = new Date();
  closeDate.setHours(parseInt(closeTime.split(":")[0]));
  closeDate.setMinutes(parseInt(closeTime.split(":")[1]));

  // Check if before open (-1), open(0) or after open (1)
  if (now < openDate) {
    return -1;
  } else if (now > closeDate) {
    return 1;
  } else {
    return 0;
  }
}

export type PoIType =
  | "attractie"
  | "toiletten"
  | "restaurant"
  | "foodtruck"
  | "lockers"
  | "winkel";
