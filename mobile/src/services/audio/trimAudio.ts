import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
// import * as FileSystem from 'expo-file-system';

export async function trimAudio(inputUri: string) {
  // 1. Tạo tên file đầu ra linh hoạt hơn
  const fileExt = inputUri.split(".").pop();
  const outputUri = inputUri.replace(`.${fileExt}`, `_trimmed.${fileExt}`);

  // 2. Câu lệnh FFmpeg tối ưu:
  // -y: Ghi đè nếu file tồn tại
  // -i "${inputUri}": Bọc ngoặc kép để tránh lỗi dấu cách
  // -ss 0: Bắt đầu từ giây thứ 0
  // -t 15: Lấy 15 giây
  // -c:a aac: Ép mã hóa lại sang chuẩn aac (an toàn hơn -c copy cho m4a)
  const command = `-y -i "${inputUri}" -ss 0 -t 15 -c:a aac "${outputUri}"`;

  console.log("Đang thực thi lệnh:", command);

  const session = await FFmpegKit.execute(command);
  const returnCode = await session.getReturnCode();

  if (ReturnCode.isSuccess(returnCode)) {
    console.log("Cắt file thành công!");
    return outputUri;
  } else {
    // Nếu lỗi, lấy log từ FFmpeg để debug
    const logs = await session.getLogs();
    console.error(
      "FFmpeg Error Logs:",
      logs.map((l) => l.getMessage()).join("\n"),
    );
    throw new Error("FFmpeg failed to trim audio");
  }
}
