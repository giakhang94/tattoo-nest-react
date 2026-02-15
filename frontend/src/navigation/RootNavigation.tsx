import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RecordScreen from "../screens/Record";
import ScanScreen from "../screens/Scan";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParamList = {
  Home: undefined;
  Record: undefined;
  Scan: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
