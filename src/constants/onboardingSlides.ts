export const ONBOARDING_SLIDES = [
  {
    key: 'intro1',
    title: 'We are The Best Job Platform in the Middle East',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('@assets/images/onboarding1.png'), // or SVG if supported
  },
  {
    key: 'intro2',
    title: 'The Place where the job finds you',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('@assets/images/onboarding2.png'),
  },
  {
    key: 'intro3',
    title: 'Let’s Start finding Job for You',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('@assets/images/onboarding3.png'),
  },
];

export type OnboardingSlideItem = typeof ONBOARDING_SLIDES[number];