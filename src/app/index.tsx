import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import useAuthStore from '@store/authStore';

export default function Index() {
  const { isAuthenticated, hasCompletedOnboarding, isLoading, setOnboarding } = useAuthStore();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  
  console.log('i was accessed with: ', isAuthenticated, hasCompletedOnboarding, isLoading);

  // First useEffect to ensure navigation is ready
  useEffect(() => {
    // Small timeout to ensure the Root Layout is fully mounted
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Second useEffect to handle the actual navigation
  useEffect(() => {
    // Only navigate when both auth is initialized and navigation is ready
    if (isLoading || !isNavigationReady) return;
    
    try {
      if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      // } else if (!isAuthenticated) {
      //   router.replace('/login');
      } else {
        setOnboarding(true);
        router.replace('/home');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [hasCompletedOnboarding, isAuthenticated, isLoading, isNavigationReady]);

  return null; // Render nothing while redirecting
}