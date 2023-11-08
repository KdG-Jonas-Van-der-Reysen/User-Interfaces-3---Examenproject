import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPointOfInterest,
  getPointOfInterests,
} from "../services/PointOfInterestDataService";
import { PointOfInterest } from "../model/PointOfInterest";

export function usePointOfInterests() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: pointOfInterests,
  } = useQuery(["pointOfInterests"], getPointOfInterests);

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
  return {
    isLoading,
    isError,
    pointOfInterests,
    addPointOfInterest,
    isAddingPointOfInterest,
    isErrorAddingPointOfInterest,
  };
}
