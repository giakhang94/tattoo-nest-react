import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { Pressable, Text, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "../components/LogoutButton";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function HomeScreen({ navigation }: Props) {
  const userToken = useAuthStore((state) => state.userToken);
  return (
    <View className="h-full flex-1 justify-center items-center">
      <Text className="font-bold text-[28px] mb-8">Tattoo Audio App</Text>
      <Pressable
        className="bg-black px-3 py-3 rounded-sm min-w-[160px] flex justify-center items-center mt-3"
        onPress={() => {
          navigation.navigate("Record");
        }}
      >
        <Text className="text-white text-[16px]">Record</Text>
      </Pressable>
      <Pressable
        className="bg-black px-3 py-3 rounded-sm min-w-[160px] flex justify-center items-center mt-3"
        onPress={() => {
          navigation.navigate("Scan");
        }}
      >
        <Text className="text-white text-[16px]">Scan</Text>
      </Pressable>
      {!userToken ? (
        <Pressable
          className="bg-transparent border-[1px] px-3 py-3 rounded-sm min-w-[160px] flex justify-center items-center mt-3"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text className="text-black text-[16px]">Login</Text>
        </Pressable>
      ) : (
        <LogoutButton />
      )}
    </View>
  );
}
