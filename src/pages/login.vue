<template>
  <div class="center-component">
    <Login v-if="!verificationId && !resolver"
      :loginWithGoogle="loginWithGoogle"
      :loginWithEmailAndPassword="loginWithEmailAndPassword" />

    <Code v-if="verificationId && resolver"
      :getCode="getCode" />

    <ui5-toast
      id="toastMessage"
      :duration="toastMsg.duration"
      :placement="toastMsg.placement">{{ toastMsg.message }}</ui5-toast>

    <div id='sign-in'></div>

  </div>
</template>

<script>
import Login from '../components/Login.vue';
import Code from '../components/Code.vue'
import {
  login,
  signInWithGoogle,
  verifyUserMFA,
  verifyUserEnrolled
} from "../../firebase/authentication";
import { useRecaptcha } from "../../hooks/userRecaptcha";
import '@ui5/webcomponents/dist/Toast';


export default {
  name: 'LoginPage',
  components: {
    Login,
    Code
  },
  data() {
    return {
      verificationId: null,
      resolver: null,
      recaptcha: null,
      toastMsg: {
        message: "",
        duration: 2000,
        placement: "BottomCenter"
      }
    };
  },
  mounted() {
    this.recaptcha = useRecaptcha('sign-in');
  },
  created() {

  },
  methods: {
    toast(message, type) {
      this.toastMsg.message = message;
      toastMessage.show();
    },
    async loginWithGoogle() {
      const response = await signInWithGoogle();

      if (response === true) {
        this.toast('Todo bien')
        // await router.push('/user');
      } else {
        await this.handleMFA(response);
      }
    },

    async loginWithEmailAndPassword(email, password) {
      const response = await login(email, password);

      if (response === true) {
        this.toast('Todo bien')
        // await router.push('/user');
      } else {
        await this.handleMFA(response);
      }
    },

    async handleMFA(response) {

      if (response.code === 'auth/multi-factor-auth-required' && this.recaptcha) {
        const data = await verifyUserMFA(response,
          this.recaptcha,
          0);

        if (!data) {
          this.toast('Ocurrió un error al obtener la verificación.');
        } else {
          const { verificationId, resolver } = data;
          this.verificationId = verificationId;
          this.resolver = resolver;
        }

      } else {
        this.toast('Usuario y contraseña incorrectos.');
      }
    },

    async getCode(code) {
      const response = await verifyUserEnrolled(
        {
          verificationId: this.verificationId,
          resolver: this.resolver
        },
        code
      );

      if (response) {
        this.toast('Todo bien')
        // await router.push('/user');
        // this.$session.set('isLogged', true)
        window.sessionStorage.setItem('isLoggedIn', true);
        this.$forceUpdate();
      } else {
        this.toast('Something went wrong.');
      }
    }

  }
};

</script>

<style scoped>
.center-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>