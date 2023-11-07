import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPointOfInterest,
  getPointOfInterests,
} from "../services/PointOfInterestDataService";
import { PointOfInterest } from "../model/PointOfInterest";

export function usePointOfInterests() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: rides } = useQuery(["rides"], getPointOfInterests);

  const {
    mutate: addRide,
    isLoading: isAddingRide,
    isError: isErrorAddingRide,
  } = useMutation((poi: Omit<PointOfInterest, "id">) => createPointOfInterest(poi), {
    onSuccess: () => {
      queryClient.invalidateQueries(["rides"]);
    },
  });
  return {
    isLoading,
    isError,
    rides,
    addRide,
    isAddingRide,
    isErrorAddingRide,
  };
}

