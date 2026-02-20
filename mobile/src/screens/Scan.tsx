import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Record">;
export default function ScanScreen() {
  return (
    <View>
      <Text>Scan Screen</Text>
    </View>
  );
}
