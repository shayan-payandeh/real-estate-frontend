import {
  addApplicantType,
  getApplicantTypes,
  getApplicantTypeById,
  removeApplicantType,
  updateApplicantType,
} from '@/services/applicantTypeService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetApplicantTypes = () =>
  useQuery({
    queryFn: getApplicantTypes,
    queryKey: ['get-applicantTypes'],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetApplicantTypeById = (id) =>
  useQuery({
    queryFn: () => getApplicantTypeById(id),
    queryKey: ['get-applicantType', id],
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddApplicantType = () =>
  useMutation({ mutationFn: addApplicantType });

export const useUpdateApplicantType = () =>
  useMutation({ mutationFn: updateApplicantType });

export const useRemoveApplicantType = () => {
  return useMutation({ mutationFn: removeApplicantType });
};
