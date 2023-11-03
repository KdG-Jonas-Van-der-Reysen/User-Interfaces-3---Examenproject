import { PoI } from "./PoI"

export interface Ride extends PoI {
    targetAudience: TargetAudienceType,
    minLength: number, // in cm
    similarRides: string[], // list of rides
}

export type TargetAudienceType = 'toddlers'|'teens'| 'adults'|'all'