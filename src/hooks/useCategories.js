import {
  addCategory,
  getCategories,
  getCategoryById,
  removeCategory,
  updateCategory,
} from '@/services/categoryService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetCategories = () =>
  useQuery({
    queryFn: getCategories,
    queryKey: ['get-categories'],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCategoriesById = (id) =>
  useQuery({
    queryFn: () => getCategoryById(id),
    queryKey: ['get-category', id],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddCategory = () => useMutation({ mutationFn: addCategory });

export const useUpdateCategory = () =>
  useMutation({ mutationFn: updateCategory });

export const useRemoveCategory = () => {
  return useMutation({ mutationFn: removeCategory });
};
