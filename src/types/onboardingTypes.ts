export type OnboardingStore = {
  currentSlide: number;
  totalSlides: number;
  isOnboardingCompleted: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  setSlide: (index: number) => void;
  completeOnboarding: () => void;
  testOnboarding: (value: boolean) => void;
};