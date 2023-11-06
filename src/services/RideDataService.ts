import axios from 'axios';
import { PointOfInterest } from '../model/PointOfInterest';
import { Ride } from '../model/Ride';

export async function getRides() {
    const points = await axios.get<(PointOfInterest | Ride)[]>('/pointOfInterests');
    return points.data
}