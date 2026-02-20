import { KeyboardTypeOptions, TextInputChangeEvent, View } from "react-native";
import { TextInput } from "react-native";

interface Props {
  name: string;
  onChange: (name: string, text: string) => void;
  placeholder: string;
  value: string;
  classname?: string;
  password?: boolean;
  keyboardType?: KeyboardTypeOptions;
}
export default function CustomInput({
  classname,
  password,
  placeholder,
  name,
  keyboardType,
  value,
  onChange,
}: Props) {
  return (
    <TextInput
      secureTextEntry={!!password}
      keyboardType={keyboardType || "default"}
      placeholder={placeholder}
      onChangeText={(text) => {
        onChange(name, text);
      }}
      className={classname}
      value={value}
    />
  );
}
