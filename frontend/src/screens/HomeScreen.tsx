import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { StyleSheet, Text, View } from "react-native";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={Sty}>
      <Text>Tattoo Audio App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
