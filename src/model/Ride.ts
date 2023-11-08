import { PointOfInterest } from "./PointOfInterest"

export interface Ride extends PointOfInterest {
    targetAudience: TargetAudienceType,
    minLength: number, // in cm
    similarRides: string[], // list of rides
}

export type TargetAudienceType = 'toddlers'|'teens'| 'adults'|'all'

export type RideData = Omit<Ride, "id"> & {
    tagsStr: string,
    similarRidesStr: string,
}