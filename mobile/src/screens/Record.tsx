import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { uploadAudio } from "../services/audio/audio-upload.service";
import {
  startRecording,
  stopRecording,
} from "../services/audio/recording.service";
import { pickAudio } from "../services/audio/pickAudio";
import { trimAudio } from "../services/audio/trimAudio";

type Props = NativeStackScreenProps<RootStackParamList, "Record">;
export default function RecordScreen() {
  const [name, setName] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const handleChangeName = (text: string) => {
    setName(text);
  };
  const validateNameField = (name: string) => {
    if (!name) {
      Alert.alert("error", "please provide your audio name");
      return false;
    }
    return true;
  };
  const handleUpload = async (uri: string) => {
    if (!validateNameField(name)) {
      return;
    }
    try {
      setIsUploading(true);
      await uploadAudio({ uri, name: name.trim() });
      Alert.alert("audio uploaded successfully ");
      setName("");
    } catch (error) {
      Alert.alert("upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  //record flow
  //handle start recording
  const handleStartRecording = async () => {
    if (!validateNameField(name)) return;

    try {
      setIsRecording(true);
      await startRecording();
    } catch (error) {
      setIsRecording(false);
      Alert.alert("Error", "cannot start recording");
    }
  };
  //handle stop recording
  const handleStopRecording = async () => {
    if (!validateNameField) return;
    try {
      setIsRecording(false);
      const uri = await stopRecording();
    } catch (error) {
      Alert.alert("error", "cannot stop recording");
    }
  };

  //pick flow
  const handlePickAudio = async () => {
    if (!validateNameField(name)) return;

    try {
      const result = await pickAudio(); // Giả sử hàm này trả về asset object hoặc URI
      if (!result) return;

      console.log("File picked:", result);

      try {
        const trimmedUri = await trimAudio(result);
        console.log("Trimmed URI:", trimmedUri);
        // await handleUpload(trimmedUri);
      } catch (trimError) {
        console.error("Lỗi tại hàm trimAudio:", trimError);
        Alert.alert(
          "Lỗi xử lý",
          "File chọn thành công nhưng không thể cắt âm thanh (có thể do định dạng file).",
        );
      }
    } catch (pickError) {
      console.error("Lỗi tại hàm pickAudio:", pickError);
      Alert.alert("Error", "Không thể chọn file từ bộ nhớ.");
    }
  };

  return (
    <View className="flex-1 bg-white px-20 py-20">
      {/* TITLE */}
      <Text className="text-24 font-bold mb-20">Upload Audio</Text>

      {/* NAME INPUT */}
      <Text className="mb-5">Audio name</Text>

      <TextInput
        value={name}
        onChangeText={handleChangeName}
        placeholder="Nhập tên audio"
        className="border border-gray-300 rounded-lg px-12 py-10 mb-20"
        editable={!isRecording && !isUploading}
      />

      {/* RECORD BUTTON */}
      <Pressable
        onPress={isRecording ? handleStopRecording : handleStartRecording}
        disabled={isUploading}
        className={`py-14 rounded-lg mb-15 ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        <Text className="text-white text-center font-bold">
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
      </Pressable>

      {/* PICK BUTTON */}
      <Pressable
        onPress={handlePickAudio}
        disabled={isRecording || isUploading}
        className="py-14 rounded-lg bg-green-500"
      >
        <Text className="text-white text-center font-bold">Pick Audio</Text>
      </Pressable>

      {/* LOADING */}
      {isUploading && (
        <View className="mt-20 items-center">
          <ActivityIndicator size="large" />
          <Text>Uploading...</Text>
        </View>
      )}
    </View>
  );
}

//handle states
//handle validate name filed (name field is required)
//handle upload
//handle start recording
//handle stop recording
//handle pick files form device
