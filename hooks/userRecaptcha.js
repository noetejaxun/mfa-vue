import { ref, onUnmounted } from "vue";
import { RecaptchaVerifier } from "@firebase/auth";
import { auth } from "../firebase/authentication";

export function useRecaptcha(componentId) {
  const recaptcha = ref(null);
  
  const recaptchaVerifier = new RecaptchaVerifier(componentId, {
    size: "invisible",
    callback: () => {}
  }, auth);
  
  recaptcha.value = recaptchaVerifier;

  onUnmounted(() => {
    recaptchaVerifier.clear();
  });

  return recaptcha;
}
