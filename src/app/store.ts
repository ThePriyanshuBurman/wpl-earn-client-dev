import { create } from "zustand";

interface UserDetailsInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  userLink: string | null;
  bio: string;
  pow: any[];
  discord: string;
  telegram: string;
  role: number;
  sponsor: any;
}

type UserDetails = {
  userDetails: UserDetailsInterface | undefined;
};

type Action = {
  updateUserDetails: (details: UserDetails["userDetails"]) => void;
};

export const useUserStore = create<UserDetails & Action>((set) => ({
  userDetails: undefined,
  updateUserDetails: (data) => set(() => ({ userDetails: data })),
}));
