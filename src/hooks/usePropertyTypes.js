import {
  addType,
  getTypeById,
  getTypes,
  removeType,
  updateType,
} from '@/services/propertyTypeService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetPropertyTypes = () =>
  useQuery({
    queryFn: getTypes,
    queryKey: ['get-propertyTypes'],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPropertyTypeById = (id) =>
  useQuery({
    queryFn: () => getTypeById(id),
    queryKey: ['get-propertyType', id],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddPropertyType = () => useMutation({ mutationFn: addType });

export const useUpdatePropertyType = () =>
  useMutation({ mutationFn: updateType });

export const useRemovePropertyType = () => {
  return useMutation({ mutationFn: removeType });
};
