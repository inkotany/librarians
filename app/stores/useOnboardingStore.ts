import { create } from "zustand";

export type OnboardingData = {
  email: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  type: string;
  password: string;
};

type OnboardingState = {
  data: Partial<OnboardingData>;
  setField: (key: keyof OnboardingData, value: unknown) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  data: {},
  setField: (key, value) =>
    set((state) => ({
      data: { ...state.data, [key]: value },
    })),
}));
