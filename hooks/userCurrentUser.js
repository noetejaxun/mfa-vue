import { ref, onUnmounted } from "vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/authentication";

export function useCurrentUser() {
  const currentUser = ref(null);

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
  });

  onUnmounted(unsubscribe);

  return currentUser;
}
