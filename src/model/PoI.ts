export interface PoI {
    name: string, // Text, min 3 characters
    type: PoIType,
    image: string, // URL
    description: string, // max 500 chars
    tags: string[],
    openingHours: OpeningHours,
    currentWaitTime: number, // in minutes
    mapDrawingOptions: MapDrawingOptions,
}

export interface OpeningHours {
    openTime: string, // HH:mm
    closeTime: string, // HH:mm
}

export interface MapDrawingOptions {
    location: Location,
    size: Size,
}

export interface Location {
    x: number,
    y: number,
}

export interface Size {
    width: number,
    height: number,
}

export type PoIType = 'attractie'| 'toiletten'| 'restaurant'| 'foodtruck'| 'lockers'
