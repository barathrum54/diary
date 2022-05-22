import { defineStore } from "pinia";
const initialUser = {
  User: null,
};
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: JSON.parse(
      localStorage.getItem("user") || JSON.stringify(initialUser)
    ),
  }),
  getters: {
    getUser() {
      return this.user.user;
    },
  },
  actions: {
    setUser(user) {
      console.log(user);
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser() {
      localStorage.removeItem("user");
      this.$reset();
    },
    logout(){
      this.clearUser();
    }
  },
});
