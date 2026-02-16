import { api } from "./client";

export async function loginApi(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response;
}

export async function logoutApi() {
  const response = await api.get("/auth/logout");
  console.log(response.data);
}
