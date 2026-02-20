import { api } from "./client";

export async function getMeApi() {
  const res = await api.get("/auth/me");
  return res.data;
}
