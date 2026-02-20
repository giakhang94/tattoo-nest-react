import * as SecureStore from "expo-secure-store";

export async function saveToken(tokenName: string, token: string) {
  await SecureStore.setItemAsync(tokenName, token);
}
export async function getToken(tokenName: string) {
  return await SecureStore.getItemAsync(tokenName);
}

export async function removeToken(tokenName: string) {
  return await SecureStore.deleteItemAsync(tokenName);
}
