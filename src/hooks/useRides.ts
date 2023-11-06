import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRide, getRides } from "../services/RideDataService";
import { RideData } from "../model/Ride";

export function useRides() {
    const queryClient = useQueryClient();
    const { isLoading, isError, data:rides } = useQuery(['rides'],  getRides);

    const {
        mutate: addRide,
        isLoading: isAddingRide,
        isError: isErrorAddingRide,
    } = useMutation((ride: RideData) => createRide(ride), {
        onSuccess: () => {
            queryClient.invalidateQueries(['rides'])
        }
    })
    return {
        isLoading, isError, rides, addRide, isAddingRide, isErrorAddingRide
    }
}