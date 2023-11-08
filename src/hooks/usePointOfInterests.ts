import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPointOfInterest,
  getPointOfInterests,
} from "../services/PointOfInterestDataService";
import { PointOfInterest, isPoIOpen } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";

export function usePointOfInterests() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: pointOfInterests,
  } = useQuery({
    queryKey: ["pointOfInterests"],
    queryFn: getPointOfInterests,
    refetchInterval: 30000,
  });

  const {
    mutate: addPointOfInterest,
    isLoading: isAddingPointOfInterest,
    isError: isErrorAddingPointOfInterest,
  } = useMutation(
    (poi: Omit<PointOfInterest, "id">) => createPointOfInterest(poi),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pointOfInterests"]);
      },
    }
  );
  
  const isPoIOpenFunc: (poi: PointOfInterest | Ride) => void = isPoIOpen;

  return {
    isLoading,
    isError,
    pointOfInterests,
    addPointOfInterest,
    isAddingPointOfInterest,
    isErrorAddingPointOfInterest,

    // Utils
    isPoIOpen: isPoIOpenFunc
  };
}
