import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TextInputChangeEvent,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Input {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [input, setInput] = useState<Input>({ email: "", password: "" });
  const handleChangeInput = (name: string, text: string) => {
    setInput((prev) => ({ ...prev, [name]: text }));
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
          className="mt-2 py-2 px-2 rounded-md  bg-black text-white font-semibold tracking-[2px]"
          onPress={() => {
            alert(input.email + " " + input.password);
          }}
        >
          <Text className="text-white text-center">Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
