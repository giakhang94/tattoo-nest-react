import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import { loginApi } from "../services/auth.api";
import { parseCookies } from "../utils/parseCookies";
import { getToken, saveToken } from "../store/storage";
import { useAuthStore } from "../store/useAuthStore";
import { RootStackParamList } from "../navigation/RootNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Input {
  email: string;
  password: string;
}
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const setToken = useAuthStore((state) => state.setToken);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<Input>({ email: "", password: "" });
  const handleChangeInput = (name: string, text: string) => {
    setInput((prev) => ({ ...prev, [name]: text }));
  };
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await loginApi(input.email, input.password);
      const tokens = parseCookies(response.headers["set-cookie"] as any);
      Object.keys(tokens).map(async (token) => {
        await saveToken(token.trim(), tokens[token]);
        if (token.trim() === "authentication_token") {
          setToken(tokens[token]);
        }
      });
      //   const access = await getToken("authentication_token");
      //   const refresh = await getToken("refresh_token");
      //   console.log("access", access);
      //   console.log("refresh", refresh);
    } catch (error: any) {
      alert(error);
      Alert.alert("Login failed", error?.response?.data?.message || error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="justify-center mx-auto mt-[50%]  space-y-5">
      <Text className="text-center text-[20px] font-bold tracking-[2px]">
        Login
      </Text>
      <View className="">
        <CustomInput
          classname="mb-2 text-left border-[1px] rounded-md py-2 px-3 min-w-[250px] outline "
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={handleChangeInput}
        />
        <View className="w-full h-fit rounded-md relative">
          <Pressable
            onPress={() => {
              setShowPassword((prev) => !prev);
            }}
            className="absolute top-[10px] right-1 z-20"
          >
            {input.password !== "" &&
              (!showPassword ? (
                <AntDesign name="eye-invisible" size={18} color="black" />
              ) : (
                <AntDesign name="eye" size={18} color="black" />
              ))}
          </Pressable>
          <CustomInput
            classname="text-left border-[1px] rounded-md py-2 px-3 min-w-[250px] outline "
            name="password"
            password={!showPassword}
            placeholder="Password"
            value={input.password}
            onChange={handleChangeInput}
          />
        </View>
        <Pressable
          className={`mt-2 py-2 px-2 rounded-md bg-black text-white font-semibold tracking-[2px] ${isLoading ? "opacity-80" : ""}`}
          onPress={handleLogin}
        >
          <Text className="text-white text-center">
            {isLoading ? "loading.." : "Login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
