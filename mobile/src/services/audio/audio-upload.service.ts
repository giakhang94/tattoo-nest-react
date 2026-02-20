import { api } from "../client";

export async function uploadAudio({
  uri,
  name,
}: {
  uri: string;
  name: string;
}) {
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: "audio.m4a",
    type: "audio.m4a",
  } as any);

  formData.append("name", name);
  await api.post("/audio", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
