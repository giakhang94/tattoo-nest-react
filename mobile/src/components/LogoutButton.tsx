import { Pressable, Text } from "react-native";
import { logoutApi } from "../services/auth.api";
import { useAuthStore } from "../store/useAuthStore";
import { removeToken } from "../store/storage";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
      await removeToken("authentication_token");
      await removeToken("refresh_token");
    } catch (error: any) {
      //   console.log("err", error.response.data || "tao");
      alert(error);
    }
  };
  return (
    <Pressable
      onPress={handleLogout}
      className="mt-4 py-3 px-2 border-[1px] min-w-[160px]"
    >
      <Text className="text-center font-bold tracking-[2px]">Logout</Text>
    </Pressable>
  );
}
