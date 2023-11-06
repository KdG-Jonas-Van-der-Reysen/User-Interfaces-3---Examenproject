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
  mapDrawingOptions: MapDrawingOptions;
}

export interface MapDrawingOptions {
  location: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export type PoIType =
  | "attractie"
  | "toiletten"
  | "restaurant"
  | "foodtruck"
  | "lockers"
  | "winkel";
