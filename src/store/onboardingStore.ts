import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingStore } from "@type/onboardingTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      currentSlide: 0,
      totalSlides: 3,
      isOnboardingCompleted: false,
      nextSlide: () => {
        const { currentSlide, totalSlides } = get();
        if (currentSlide < totalSlides - 1) {
          set({ currentSlide: currentSlide + 1 });
        } else {
          set({ isOnboardingCompleted: true });
        }
      },

      prevSlide: () => {
        const { currentSlide } = get();
        if (currentSlide > 0) {
          set({ currentSlide: currentSlide - 1 });
        }
      },

      setSlide: (index: number) => set({ currentSlide: index }),

      completeOnboarding: () => set({ isOnboardingCompleted: true }),
      testOnboarding: (value: boolean) => set({ isOnboardingCompleted: value }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
