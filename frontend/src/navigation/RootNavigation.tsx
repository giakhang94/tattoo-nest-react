import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RecordScreen from "../screens/Record";
import ScanScreen from "../screens/Scan";
import LoginScreen from "../screens/LoginScreen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/useAuthStore";

export type RootStackParamList = {
  Home: undefined;
  Record: undefined;
  Scan: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const userToken = useAuthStore((state) => state.userToken);
  const setUserToken = useAuthStore((state) => state.setToken);
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const authToken = await SecureStore.getItemAsync(
          "authentication_token",
        );
        const refreshToken = await SecureStore.getItemAsync("refresh_token");
        if (authToken) setUserToken(authToken);
      } catch (error) {
        console.log("token error root navigate");
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);
  if (isLoading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Record" component={RecordScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
