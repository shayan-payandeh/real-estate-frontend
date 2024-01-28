import {
  addPropertyRequest,
  getPropertyRequestById,
  getPropertyRequests,
  removePropertyRequest,
  updatePropertyRequest,
} from '@/services/propertyRequestService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetPropertyRequests = (query) =>
  useQuery({
    queryFn: () => getPropertyRequests(query),
    queryKey: ['get-propertyRequests', query],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPropertyRequestById = (id) =>
  useQuery({
    queryFn: () => getPropertyRequestById(id),
    queryKey: ['get-propertyRequest'],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useRemovePropertyRequest = () => {
  return useMutation({ mutationFn: removePropertyRequest });
};

export const useAddPropertyRequest = () =>
  useMutation({ mutationFn: addPropertyRequest });

export const useUpdatePropertyRequest = () =>
  useMutation({ mutationFn: updatePropertyRequest });
