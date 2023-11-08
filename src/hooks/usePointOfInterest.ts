import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePointOfInterest,
  getPointOfInterest,
  updatePointOfInterest,
} from "../services/PointOfInterestDataService";
import { PointOfInterest, isPoIOpen } from "../model/PointOfInterest";
import { Ride } from "../model/Ride";

export function usePointOfInterest(id: string) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: pointOfInterest,
  } = useQuery(["poi", id], () => {
    return getPointOfInterest(id);
  });

  // Edit point of interest
  const {
    mutate: editPointOfInterest,
    isLoading: isEditingPointOfInterest,
    isError: isErrorEditingPointOfInterest,
  } = useMutation(
    (poi: Omit<PointOfInterest, "id">) => updatePointOfInterest(id, poi),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pointOfInterests", id]);
        queryClient.invalidateQueries(["pointOfInterests"]);
      },
    }
  );

  // Remove point of interest
  const {
    mutate: removePointOfInterest,
    isLoading: isRemovingPointOfInterest,
    isError: isErrorRemovingPointOfInterest,
  } = useMutation(() => deletePointOfInterest(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["pointOfInterests", id]);
      queryClient.invalidateQueries(["pointOfInterests"]);
    },
  });

  const isPoIOpenFunc: (poi: PointOfInterest | Ride) => void = isPoIOpen;
  
  return {
    // Get
    isLoading,
    isError,
    pointOfInterest,

    // Edit
    editPointOfInterest,
    isEditingPointOfInterest,
    isErrorEditingPointOfInterest,

    // Remove
    removePointOfInterest,
    isRemovingPointOfInterest,
    isErrorRemovingPointOfInterest,

    // Utility functions
    isPoIOpen: isPoIOpenFunc
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
