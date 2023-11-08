import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPointOfInterest,
  updatePointOfInterest,
} from "../services/PointOfInterestDataService";
import { PointOfInterest } from "../model/PointOfInterest";

export function usePointOfInterest(id: string) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: pointOfInterest,
  } = useQuery(["poi", id], () => {
    return getPointOfInterest(id);
  });

  const {
    mutate: editPointOfInterest,
    isLoading: isEditingPointOfInterest,
    isError: isErrorEditingPointOfInterest,
  } = useMutation(
    (poi: Omit<PointOfInterest, "id">) => updatePointOfInterest(id, poi),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pointOfInterests", id]);
        queryClient.invalidateQueries(["pointOfInterests"])
      },
    }
  );
  return {
    isLoading,
    isError,
    pointOfInterest,
    editPointOfInterest,
    isEditingPointOfInterest,
    isErrorEditingPointOfInterest,
  };

  return {
    isLoading,
    isError,
    pointOfInterest,
    editPointOfInterest,
    isEditingPointOfInterest,
    isErrorEditingPointOfInterest,
  };
}
