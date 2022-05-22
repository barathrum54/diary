<template>
  <div class="container">
    <h2 class="title">Register</h2>
    <div class="input-wrap">
      <label for="">Email</label>
      <input v-model="registerData.email" type="text" class="login-input" />
    </div>
    <div class="input-wrap">
      <label for="">Password</label>
      <input
        v-model="registerData.password"
        type="password"
        class="login-input"
      />
    </div>
    <button class="submit-btn" @click="register">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { login } from "@/services/auth.service";

const router = useRouter();
const auth = getAuth();
const registerData = ref({
  email: null,
  password: null,
});

const register = () => {
  createUserWithEmailAndPassword(
    auth,
    registerData.value.email,
    registerData.value.password
  )
    .then((res) => {
      login(res);
      Swal.fire(
        "Success",
        "Your account is succesfully created.",
        "success"
      ).then(() => {
        router.push("/");
      });
    })
    .catch((err) => {
      Swal.fire("Error", err.message, "error");
    });
};
</script>
<style>
.container {
  width: 50%;
  margin: auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.title {
  color: rgba(27, 120, 227, 0.8);
}
.input-wrap {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.login-input {
  margin-bottom: 10px;
  padding: 10px 30px;
  border: 1pt solid rgba(0, 0, 0, 0.2);
  outline: none;
  resize: none;
  border-radius: 5px;
}
.login-input:focus {
  outline: none;
}

.submit-btn {
  border-radius: 5px;
  border: 1pt solid white;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
}
.submit-btn:hover {
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
}
</style>
