import axios from "axios";
import { BASE_URL } from "@env";
import { getToken } from "../store/storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@env";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const accessToken = await getToken(ACCESS_TOKEN);
  const refreshToken = await getToken(REFRESH_TOKEN);
  let cookie = "";
  if (accessToken) {
    cookie = cookie + `authentication_token=${accessToken}`;
  }
  if (refreshToken) {
    cookie = cookie + `refresh_token=${refreshToken}`;
  }
  config.headers.Cookie = cookie;
  return config;
});
