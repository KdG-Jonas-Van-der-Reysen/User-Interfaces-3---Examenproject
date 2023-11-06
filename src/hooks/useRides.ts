import { useQuery } from "@tanstack/react-query";
import { getRides } from "../services/RideDataService";

export function useRides() {
    const { isLoading, isError, data:rides } = useQuery(['rides'],  getRides);
    return {
        isLoading, isError, rides
    }
}