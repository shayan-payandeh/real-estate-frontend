import {
  addLocation,
  getLocations,
  getLocationById,
  removeLocation,
  updateLocation,
} from '@/services/locaionService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetLocations = () =>
  useQuery({
    queryFn: getLocations,
    queryKey: ['get-locations'],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetLocationById = (id) =>
  useQuery({
    queryFn: () => getLocationById(id),
    queryKey: ['get-location', id],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddLocation = () => useMutation({ mutationFn: addLocation });

export const useUpdateLocation = () =>
  useMutation({ mutationFn: updateLocation });

export const useRemoveLocation = () => {
  return useMutation({ mutationFn: removeLocation });
};
