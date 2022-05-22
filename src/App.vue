<template>
  <div class="d-flex flex-column" style="height:100% !important">
    <div id="nav">
      <div class="nav-group" v-if="user">
        <router-link to="/">Today</router-link> |
        <router-link to="/history">History</router-link>
      </div>
      <div class="nav-group" v-if="!user">
        (<router-link to="/login">Login</router-link> -
        <router-link to="/register">Register</router-link> )
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      <div class="nav-group profile" v-if="user">
        <span>{{ user.email }}</span>
        <a class="btn btn-secondary" style="cursor: pointer" @click="logout"
          >Logout</a
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "@/store/auth.store";
const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => {
  let _user = authStore.getUser;
  console.log(_user);
  return _user;
});
const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
<style>
body{
  height: 100%;
}
html{
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  color: #2c3e50;
}

#nav {
  height: 5% !important;
  padding: 30px;
  display: flex;
  justify-content: space-evenly;
}
.nav-group {
  display: flex;
}
.nav-group.profile {
  flex-flow: column;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: rgba(0, 0, 0, 1);
  text-decoration: underline;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85% !important;
}
.footer {
  height: 10% !important;
  display: flex;
  justify-content: center;
  bottom: 0px;
  width: 100%;
  background: rgb(244, 244, 244);
  padding-block: 10px;
}
</style>
