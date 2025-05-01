import { AppButton, AppText } from '@components/ui';
import useAuthStore from '@store/authStore';
import { StyleSheet, View } from 'react-native';


export default function HomeScreen() {
  const { user, isAuthenticated, logout } = useAuthStore();
  console.log('user after login: ', JSON.stringify(user, null, 2));

  const handleLogout = async () => {
    await logout();
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <AppText >First Name: {user?.name}</AppText>
      <AppText >Email: {user?.email}</AppText>
      <AppButton title='Logout' onPress={handleLogout}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
