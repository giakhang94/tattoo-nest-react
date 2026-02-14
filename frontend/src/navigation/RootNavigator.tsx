import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
//import RecordScreen
//import ScanScreen

export type RootStackParamList = {
  Home: undefined;
  Record: undefined;
  Scan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Record" component={} />
        <Stack.Screen name="Scan" component={} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
