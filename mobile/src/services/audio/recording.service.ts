import { Audio } from "expo-av";

let recording: Audio.Recording | null = null;

export async function startRecording() {
  await Audio.requestPermissionsAsync();

  recording = new Audio.Recording();

  await recording.prepareToRecordAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY,
  );

  await recording.startAsync();

  setTimeout(async () => {
    if (recording) {
      await stopRecording();
    }
  }, 15000);
}

export async function stopRecording(): Promise<string | null> {
  if (!recording) return null;
  try {
    const status = await recording.getStatusAsync();
    if (status.canRecord) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recording = null;
      return uri;
    }
    return null;
  } catch (error) {
    console.error("failed to stop recording safely", error);
    recording = null;
    return null;
  }
}
