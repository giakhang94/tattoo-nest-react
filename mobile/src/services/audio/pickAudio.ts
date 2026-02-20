import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

export const pickAudio = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*", // Chỉ cho phép chọn các tệp âm thanh
      copyToCacheDirectory: true, // Copy vào cache để dễ dàng upload sau này
    });

    // Kiểm tra nếu người dùng không hủy bỏ việc chọn
    if (!result.canceled) {
      const asset = result.assets[0].uri;

      // console.log("Thông tin file:", {
      //   name: asset.name,
      //   uri: asset.uri,
      //   size: asset.size,
      //   mimeType: asset.mimeType,
      // });

      // Trả về asset để sử dụng (ví dụ để upload lên NestJS)
      return asset;
    } else {
      console.log("Người dùng đã hủy chọn file");
      return null;
    }
  } catch (error) {
    Alert.alert("Lỗi", "Không thể mở trình chọn tệp.");
    console.error(error);
  }
};
