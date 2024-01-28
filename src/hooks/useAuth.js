import { getProfile } from '@/services/authService';
import { getAllUsers } from '@/services/authService';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () =>
  useQuery({
    queryKey: ['get-users'],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProfile = () =>
  useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });
