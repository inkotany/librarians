import { create } from "zustand";

type OnboardingData = {
  id: string;
  role: string;
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
