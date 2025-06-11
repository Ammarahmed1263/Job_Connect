export const PROFILE_MENU_ITEMS = [
  {
    id: 'personal-info',
    icon: 'person-outline' as const,
    title: 'Personal Information',
    onPress: () => console.log('Personal Information'),
    iconColor: '#6366F1'
  },
  // {
  //   id: 'analytics',
  //   icon: 'analytics-outline' as const,
  //   title: 'Analytics',
  //   onPress: () => console.log('Analytics'),
  //   iconColor: '#8B5CF6'
  // },
  {
    id: 'applications',
    icon: 'document-text-outline' as const,
    title: 'My Application',
    onPress: () => console.log('My Application'),
    iconColor: '#06B6D4'
  },
  {
    id: 'job-status',
    icon: 'eye-outline' as const,
    title: 'Job Seeking Status',
    onPress: () => console.log('Job Seeking Status'),
    iconColor: '#10B981'
  },
  {
    id: 'settings',
    icon: 'settings-outline' as const,
    title: 'Settings',
    onPress: () => console.log('Settings'),
    iconColor: '#6B7280'
  },
  // {
  //   id: 'language',
  //   icon: 'globe-outline' as const,
  //   title: 'Language',
  //   onPress: () => console.log('Language'),
  //   iconColor: '#F59E0B'
  // },
  {
    id: 'help',
    icon: 'help-circle-outline' as const,
    title: 'Help Center',
    onPress: () => console.log('Help Center'),
    iconColor: '#EF4444'
  },
  {
    id: 'privacy',
    icon: 'shield-checkmark-outline' as const,
    title: 'Privacy Policy',
    onPress: () => console.log('Privacy Policy'),
    iconColor: '#8B5CF6'
  },
  // {
  //   id: 'invite',
  //   icon: 'people-outline' as const,
  //   title: 'Invites Friends',
  //   onPress: () => console.log('Invite Friends'),
  //   iconColor: '#06B6D4'
  // }
];

export type OnboardingSlideItem = typeof PROFILE_MENU_ITEMS[number];