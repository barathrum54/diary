import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";

const requiredAuth = (to, form, next) => {
  const authStore = useAuthStore();
  const { getUser } = storeToRefs(authStore);
  if (!getUser.value && to.fullPath !== "/login" && to.fullPath !== "/register")
    return next(`/login`);
  else if(getUser.value && (to.fullPath == "/login" || to.fullPath == "/register" ))
    return next('/');
  else
  return next();
  // if (
  //   (to.meta.requiredAuth && !isAuthenticated.value) ||
  //   (to.fullPath === "/" && !isAuthenticated.value)
  // ) {
  //   alert("if");
  //   return next("/login");
  // } else if (
  //   (to.meta.authPage && isAuthenticated.value) ||
  //   (to.fullPath === "/" && isAuthenticated.value)
  // ) {
  //   alert("else if");

  //   return next(`/today`);
  // } else {
  //   alert("else");
  //   return next();
  // }

  //return next();
};

export { requiredAuth };
