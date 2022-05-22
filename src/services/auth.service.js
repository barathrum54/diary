import { useAuthStore } from "@/store/auth.store";
const authStore = useAuthStore();

export const login = async (user) => {
  authStore.setUser(user);
};
